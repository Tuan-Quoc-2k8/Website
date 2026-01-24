// ===== GLOBAL APP NAMESPACE =====
const GeometryApp = {
    scene: null,
    points: null,
    lines: null,
    planes: null,
    shapes: null,
    settings: null,
    storage: null,
    ui: null,
    lang: null,
    modal: null,
    camera: null,
    controls: null,
    labelRenderer: null,
    state: {
        points: [],
        lines: [],
        planes: [],
        availablePointIds: [],
        settings: {
            showLabels: true,
            showAxes: true,
            showGrid: true
        },
        language: 'en'
    }
};

// ===== CSS2D RENDERER (for labels) =====
class CSS2DObject extends THREE.Object3D {
    constructor(element) {
        super();
        this.element = element;
        this.element.style.position = 'absolute';
    }
}

class CSS2DRenderer {
    constructor() {
        this.domElement = document.createElement('div');
        this.domElement.style.position = 'absolute';
        this.domElement.style.top = '0';
        this.domElement.style.pointerEvents = 'none';
    }

    setSize(width, height) {
        this.domElement.style.width = width + 'px';
        this.domElement.style.height = height + 'px';
    }

    render(scene, camera) {
        const vector = new THREE.Vector3();
        const viewMatrix = camera.matrixWorldInverse;
        const projectionMatrix = camera.projectionMatrix;

        scene.traverse((object) => {
            if (object instanceof CSS2DObject) {
                vector.setFromMatrixPosition(object.matrixWorld);
                vector.applyMatrix4(viewMatrix);
                vector.applyMatrix4(projectionMatrix);

                const widthHalf = this.domElement.clientWidth / 2;
                const heightHalf = this.domElement.clientHeight / 2;

                const x = (vector.x * widthHalf) + widthHalf;
                const y = -(vector.y * heightHalf) + heightHalf;

                object.element.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
                object.element.style.display = (vector.z < 1) ? '' : 'none';
            }
        });
    }
}

// ===== MODAL SYSTEM =====
GeometryApp.modal = (() => {
    let overlay, title, message, confirmBtn, cancelBtn, closeBtn;
    let resolveCallback = null;

    function init() {
        overlay = document.getElementById('modal-overlay');
        title = document.getElementById('modal-title');
        message = document.getElementById('modal-message');
        confirmBtn = document.getElementById('modal-confirm');
        cancelBtn = document.getElementById('modal-cancel');
        closeBtn = document.getElementById('modal-close');

        if (!overlay) return;

        confirmBtn.addEventListener('click', () => {
            hide();
            if (resolveCallback) resolveCallback(true);
        });

        cancelBtn.addEventListener('click', () => {
            hide();
            if (resolveCallback) resolveCallback(false);
        });

        closeBtn.addEventListener('click', () => {
            hide();
            if (resolveCallback) resolveCallback(false);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                hide();
                if (resolveCallback) resolveCallback(false);
            }
        });
    }

    function show(titleText, messageText, showCancel = true) {
        if (!overlay) return Promise.resolve(false);

        title.textContent = titleText;
        message.textContent = messageText;
        cancelBtn.style.display = showCancel ? 'block' : 'none';
        overlay.classList.add('active');

        return new Promise((resolve) => {
            resolveCallback = resolve;
        });
    }

    function hide() {
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    function alert(titleText, messageText) {
        return show(titleText, messageText, false);
    }

    function confirm(titleText, messageText) {
        return show(titleText, messageText, true);
    }

    return { init, show, hide, alert, confirm };
})();

// ===== LANGUAGE MODULE =====
GeometryApp.lang = (() => {
    const translations = {
        en: {
            'lang-points-title': 'Points Manager',
            'lang-create-point': 'Create Point',
            'lang-point-color': 'Point Color',
            'lang-add-point': 'Add Point',
            'lang-click-hint': '💡 Click in 3D space to add point',
            'lang-name': 'Name',
            'lang-actions': 'Actions',
            'lang-connections': 'Connections',
            'lang-connect-points': 'Connect Two Points',
            'lang-select-start': 'Select start point...',
            'lang-select-end': 'Select end point...',
            'lang-line-color': 'Line Color',
            'lang-line-thickness': 'Line Thickness',
            'lang-connect': 'Connect',
            'lang-planes': 'Planes',
            'lang-select-points-plane': 'Select 3+ Points for Plane',
            'lang-plane-color': 'Plane Color',
            'lang-plane-opacity': 'Opacity',
            'lang-create-plane': 'Create Plane',
            'lang-shapes': 'Preset Shapes',
            'lang-triangle': 'Triangle',
            'lang-tetrahedron': 'Tetrahedron',
            'lang-cube': 'Cube',
            'lang-prism': 'Prism',
            'lang-pyramid': 'Pyramid',
            'lang-language': 'Language',
            'lang-view-settings': 'View Settings',
            'lang-show-axes': 'Show Axes',
            'lang-show-grid': 'Show Grid',
            'lang-show-labels': 'Show Point Labels',
            'lang-bg-color': 'Background Color',
            'lang-default-point-color': 'Default Point Color',
            'lang-default-line-color': 'Default Line Color',
            'lang-storage': 'Storage',
            'lang-save': 'Save Model',
            'lang-load': 'Load Model',
            'lang-export': 'Export JSON',
            'lang-clear': 'Clear All'
        },
        vi: {
            'lang-points-title': 'Quản Lý Điểm',
            'lang-create-point': 'Tạo Điểm',
            'lang-point-color': 'Màu Điểm',
            'lang-add-point': 'Thêm Điểm',
            'lang-click-hint': '💡 Click trái để thêm điểm vào không gian 3D',
            'lang-name': 'Tên',
            'lang-actions': 'Hành Động',
            'lang-connections': 'Kết Nối',
            'lang-connect-points': 'Nối Hai Điểm',
            'lang-select-start': 'Chọn điểm bắt đầu...',
            'lang-select-end': 'Chọn điểm kết thúc...',
            'lang-line-color': 'Màu Đường',
            'lang-line-thickness': 'Độ Dày Đường',
            'lang-connect': 'Kết Nối',
            'lang-planes': 'Mặt Phẳng',
            'lang-select-points-plane': 'Chọn 3+ Điểm Cho Mặt Phẳng',
            'lang-plane-color': 'Màu Mặt Phẳng',
            'lang-plane-opacity': 'Độ Trong Suốt',
            'lang-create-plane': 'Tạo Mặt Phẳng',
            'lang-shapes': 'Hình Dạng Có Sẵn',
            'lang-triangle': 'Tam Giác',
            'lang-tetrahedron': 'Tứ Diện',
            'lang-cube': 'Hình Lập Phương',
            'lang-prism': 'Lăng Trụ',
            'lang-pyramid': 'Kim Tự Tháp',
            'lang-language': 'Ngôn Ngữ',
            'lang-view-settings': 'Cài Đặt Hiển Thị',
            'lang-show-axes': 'Hiện Trục Tọa Độ',
            'lang-show-grid': 'Hiện Lưới',
            'lang-show-labels': 'Hiện Tên Điểm',
            'lang-bg-color': 'Màu Nền',
            'lang-default-point-color': 'Màu Điểm Mặc Định',
            'lang-default-line-color': 'Màu Đường Mặc Định',
            'lang-storage': 'Lưu Trữ',
            'lang-save': 'Lưu Mô Hình',
            'lang-load': 'Tải Mô Hình',
            'lang-export': 'Xuất JSON',
            'lang-clear': 'Xóa Tất Cả'
        },
        jp: {
            'lang-points-title': 'ポイント管理',
            'lang-create-point': 'ポイント作成',
            'lang-point-color': 'ポイントの色',
            'lang-add-point': 'ポイントを追加',
            'lang-click-hint': '💡 3D空間をクリックしてポイントを追加',
            'lang-name': '名前',
            'lang-actions': 'アクション',
            'lang-connections': '接続',
            'lang-connect-points': '2点を接続',
            'lang-select-start': '開始点を選択...',
            'lang-select-end': '終了点を選択...',
            'lang-line-color': 'ラインの色',
            'lang-line-thickness': 'ライン太さ',
            'lang-connect': '接続',
            'lang-planes': '平面',
            'lang-select-points-plane': '平面用に3点以上選択',
            'lang-plane-color': '平面の色',
            'lang-plane-opacity': '不透明度',
            'lang-create-plane': '平面を作成',
            'lang-shapes': 'プリセット形状',
            'lang-triangle': '三角形',
            'lang-tetrahedron': '四面体',
            'lang-cube': '立方体',
            'lang-prism': 'プリズム',
            'lang-pyramid': 'ピラミッド',
            'lang-language': '言語',
            'lang-view-settings': '表示設定',
            'lang-show-axes': '軸を表示',
            'lang-show-grid': 'グリッドを表示',
            'lang-show-labels': 'ポイント名を表示',
            'lang-bg-color': '背景色',
            'lang-default-point-color': 'デフォルトポイント色',
            'lang-default-line-color': 'デフォルトライン色',
            'lang-storage': 'ストレージ',
            'lang-save': 'モデルを保存',
            'lang-load': 'モデルを読込',
            'lang-export': 'JSON出力',
            'lang-clear': '全てクリア'
        }
    };

    function setLanguage(lang) {
        const trans = translations[lang] || translations['en'];
        
        Object.keys(trans).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = trans[key];
            }
        });

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        GeometryApp.state.language = lang;
    }

    return { setLanguage };
})();

// ===== SCENE MODULE =====
GeometryApp.scene = (() => {
    let scene, camera, renderer, labelRenderer;
    let axes, grid;
    const container = document.getElementById('canvas-container');

    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x2a2a2a);

        camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(8, 8, 8);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(labelRenderer.domElement);

        // Axes: X=red, Y=green, Z=blue (Z is vertical/height)
        axes = new THREE.AxesHelper(10);
        scene.add(axes);

        // Grid on XY plane (horizontal)
        grid = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
        grid.rotation.x = Math.PI / 2; // Rotate to XY plane
        scene.add(grid);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        window.addEventListener('resize', onWindowResize);

        GeometryApp.labelRenderer = labelRenderer;
        return { scene, camera, renderer, labelRenderer };
    }

    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        labelRenderer.setSize(container.clientWidth, container.clientHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        if (GeometryApp.controls) {
            GeometryApp.controls.update();
        }
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
    }

    return {
        init,
        animate,
        getScene: () => scene,
        getCamera: () => camera,
        getRenderer: () => renderer,
        getAxes: () => axes,
        getGrid: () => grid,
        getLabelRenderer: () => labelRenderer
    };
})();

// ===== CAMERA CONTROLS MODULE =====
GeometryApp.controls = (() => {
    let camera, renderer;
    let isRightMouseDown = false;
    let isMiddleMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let spherical = { radius: 13.86, theta: Math.PI / 4, phi: Math.PI / 4 };
    let target = new THREE.Vector3(0, 0, 0);
    let keys = { w: false, a: false, s: false, d: false };

    function init(cam, rend) {
        camera = cam;
        renderer = rend;

        const canvas = renderer.domElement;

        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('wheel', onWheel);
        canvas.addEventListener('contextmenu', e => e.preventDefault());

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
    }

    function onMouseDown(e) {
        if (e.button === 2) {
            isRightMouseDown = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        } else if (e.button === 1) {
            isMiddleMouseDown = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            e.preventDefault();
        }
    }

    function onMouseMove(e) {
        if (isRightMouseDown) {
            const deltaX = e.clientX - lastMouseX;
            const deltaY = e.clientY - lastMouseY;

            spherical.theta -= deltaX * 0.01;
            spherical.phi -= deltaY * 0.01;
            spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            updateCameraPosition();
        } else if (isMiddleMouseDown) {
            const deltaX = e.clientX - lastMouseX;
            const deltaY = e.clientY - lastMouseY;

            const panSpeed = 0.01;
            const right = new THREE.Vector3();
            const up = new THREE.Vector3(0, 1, 0);
            camera.getWorldDirection(right);
            right.cross(up).normalize();

            target.addScaledVector(right, -deltaX * panSpeed);
            target.y += deltaY * panSpeed;

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            updateCameraPosition();
        }
    }

    function onMouseUp(e) {
        if (e.button === 2) isRightMouseDown = false;
        if (e.button === 1) isMiddleMouseDown = false;
    }

    function onWheel(e) {
        e.preventDefault();
        spherical.radius += e.deltaY * 0.01;
        spherical.radius = Math.max(1, Math.min(50, spherical.radius));
        updateCameraPosition();
    }

    function onKeyDown(e) {
        const key = e.key.toLowerCase();
        if (key === 'w') keys.w = true;
        if (key === 'a') keys.a = true;
        if (key === 's') keys.s = true;
        if (key === 'd') keys.d = true;
    }

    function onKeyUp(e) {
        const key = e.key.toLowerCase();
        if (key === 'w') keys.w = false;
        if (key === 'a') keys.a = false;
        if (key === 's') keys.s = false;
        if (key === 'd') keys.d = false;
    }

    function update() {
        const panSpeed = 0.1;
        if (keys.w || keys.a || keys.s || keys.d) {
            const forward = new THREE.Vector3();
            const right = new THREE.Vector3();
            camera.getWorldDirection(forward);
            forward.y = 0;
            forward.normalize();
            right.crossVectors(forward, new THREE.Vector3(0, 1, 0));

            if (keys.w) target.addScaledVector(forward, panSpeed);
            if (keys.s) target.addScaledVector(forward, -panSpeed);
            if (keys.a) target.addScaledVector(right, -panSpeed);
            if (keys.d) target.addScaledVector(right, panSpeed);

            updateCameraPosition();
        }
    }

    function updateCameraPosition() {
        const x = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
        const y = spherical.radius * Math.cos(spherical.phi);
        const z = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);

        camera.position.set(
            target.x + x,
            target.y + y,
            target.z + z
        );
        camera.lookAt(target);
    }

    return { init, update };
})();

// ===== POINTS MODULE (Z = HEIGHT) =====
GeometryApp.points = (() => {
    let scene;

    function init(sceneRef) {
        scene = sceneRef;
        setupClickListener();
    }

    function setupClickListener() {
        const canvas = GeometryApp.scene.getRenderer().domElement;
        canvas.addEventListener('click', onClick);
    }

    function onClick(e) {
        if (e.button !== 0) return;

        const canvas = GeometryApp.scene.getRenderer().domElement;
        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(x, y), GeometryApp.scene.getCamera());

        // Click on XY plane (Z=0)
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const intersection = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersection);

        if (intersection) {
            const color = document.getElementById('point-color')?.value || '#3b82f6';
            addPoint(intersection.x, intersection.y, intersection.z, color);
        }
    }

    function getNextAvailableId() {
        const state = GeometryApp.state;
        
        if (state.availablePointIds.length > 0) {
            state.availablePointIds.sort((a, b) => a - b);
            return state.availablePointIds.shift();
        }
        
        let maxId = 0;
        state.points.forEach(p => {
            const num = parseInt(p.name.substring(1));
            if (num > maxId) maxId = num;
        });
        
        return maxId + 1;
    }

    function createLabel(text) {
        const div = document.createElement('div');
        div.className = 'point-label';
        div.textContent = text;
        const label = new CSS2DObject(div);
        label.position.set(0, 0, 0.5); // Offset above point
        return label;
    }

    function addPoint(x, y, z, color = '#3b82f6', name = null) {
        const pointId = name ? parseInt(name.substring(1)) : getNextAvailableId();
        const pointName = `P${pointId}`;
        
        const geometry = new THREE.SphereGeometry(0.2, 16, 16);
        const material = new THREE.MeshPhongMaterial({ color: color });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(x, y, z);

        const label = createLabel(pointName);
        sphere.add(label);

        scene.add(sphere);

        const point = {
            name: pointName,
            id: pointId,
            x, y, z,
            color,
            mesh: sphere,
            label: label,
            visible: true
        };

        GeometryApp.state.points.push(point);
        GeometryApp.ui.updatePointsTable();
        GeometryApp.ui.updatePointSelectors();
        GeometryApp.ui.updatePlanePointSelector();
        GeometryApp.ui.updateStats();

        return point;
    }

    function updatePoint(name, x, y, z) {
        const point = GeometryApp.state.points.find(p => p.name === name);
        if (point) {
            point.x = x;
            point.y = y;
            point.z = z;
            point.mesh.position.set(x, y, z);
            GeometryApp.lines.updateConnections();
            GeometryApp.planes.updatePlanes();
        }
    }

    function renamePoint(oldName, newName) {
        if (!/^[a-z0-9-]{1,5}$/i.test(newName)) {
            return { success: false, error: 'Name must be 1-5 chars (a-z, 0-9, -)' };
        }

        if (GeometryApp.state.points.some(p => p.name === newName && p.name !== oldName)) {
            return { success: false, error: 'Name already exists' };
        }

        const point = GeometryApp.state.points.find(p => p.name === oldName);
        if (!point) {
            return { success: false, error: 'Point not found' };
        }

        point.name = newName;
        point.label.element.textContent = newName;

        GeometryApp.state.lines.forEach(line => {
            if (line.from === oldName) line.from = newName;
            if (line.to === oldName) line.to = newName;
        });

        GeometryApp.state.planes.forEach(plane => {
            const index = plane.pointNames.indexOf(oldName);
            if (index !== -1) {
                plane.pointNames[index] = newName;
            }
        });

        GeometryApp.ui.updatePointsTable();
        GeometryApp.ui.updatePointSelectors();
        GeometryApp.ui.updatePlanePointSelector();
        GeometryApp.ui.updateConnectionsList();
        GeometryApp.ui.updatePlanesList();

        return { success: true };
    }

    async function deletePoint(name) {
        const state = GeometryApp.state;
        const index = state.points.findIndex(p => p.name === name);
        
        if (index !== -1) {
            const point = state.points[index];
            
            const usedByPlanes = state.planes.filter(plane => 
                plane.pointNames.includes(name)
            );
            
            if (usedByPlanes.length > 0) {
                const planeNames = usedByPlanes.map(p => p.name).join(', ');
                const confirmed = await GeometryApp.modal.confirm(
                    'Delete Point',
                    `Point ${name} is used by plane(s): ${planeNames}.\nDeleting this point will also delete these planes.\n\nContinue?`
                );
                
                if (!confirmed) return;
                
                usedByPlanes.forEach(plane => {
                    GeometryApp.planes.deletePlane(plane.name);
                });
            }
            
            point.mesh.geometry.dispose();
            point.mesh.material.dispose();
            scene.remove(point.mesh);
            
            state.availablePointIds.push(point.id);
            
            state.points.splice(index, 1);
            GeometryApp.ui.updatePointsTable();
            GeometryApp.ui.updatePointSelectors();
            GeometryApp.ui.updatePlanePointSelector();
            GeometryApp.lines.removeConnectionsByPoint(name);
            GeometryApp.ui.updateStats();
        }
    }

    function clearAll() {
        GeometryApp.state.points.forEach(p => {
            p.mesh.geometry.dispose();
            p.mesh.material.dispose();
            scene.remove(p.mesh);
        });
        GeometryApp.state.points = [];
        GeometryApp.state.availablePointIds = [];
        GeometryApp.ui.updatePointsTable();
        GeometryApp.ui.updatePointSelectors();
        GeometryApp.ui.updatePlanePointSelector();
        GeometryApp.ui.updateStats();
    }

    return {
        init,
        addPoint,
        updatePoint,
        renamePoint,
        deletePoint,
        clearAll
    };
})();

// ===== LINES MODULE (FIXED: Thinner lines, reversible visibility) =====
GeometryApp.lines = (() => {
    let scene;

    function init(sceneRef) {
        scene = sceneRef;
    }

    function connectionExists(fromName, toName) {
        return GeometryApp.state.lines.some(line => 
            (line.from === fromName && line.to === toName) ||
            (line.from === toName && line.to === fromName)
        );
    }

    function createLineMesh(from, to, color, thickness) {
        const direction = new THREE.Vector3().subVectors(
            new THREE.Vector3(to.x, to.y, to.z),
            new THREE.Vector3(from.x, from.y, from.z)
        );
        const length = direction.length();
        
        const geometry = new THREE.CylinderGeometry(thickness, thickness, length, 8);
        const material = new THREE.MeshPhongMaterial({ color: color });
        const cylinder = new THREE.Mesh(geometry, material);

        const midpoint = new THREE.Vector3(
            (from.x + to.x) / 2,
            (from.y + to.y) / 2,
            (from.z + to.z) / 2
        );
        cylinder.position.copy(midpoint);

        const axis = new THREE.Vector3(0, 1, 0);
        cylinder.quaternion.setFromUnitVectors(axis, direction.clone().normalize());

        return cylinder;
    }

    function connectPoints(fromName, toName, color = '#00ff00', thickness = 0.05) {
        if (connectionExists(fromName, toName)) {
            return { success: false, error: 'Connection already exists between these points' };
        }

        const points = GeometryApp.state.points;
        const from = points.find(p => p.name === fromName);
        const to = points.find(p => p.name === toName);

        if (!from || !to) return { success: false, error: 'Invalid points' };

        const line = createLineMesh(from, to, color, thickness);
        scene.add(line);

        const connection = {
            from: fromName,
            to: toName,
            color,
            thickness,
            line,
            visible: true
        };

        GeometryApp.state.lines.push(connection);
        GeometryApp.ui.updateConnectionsList();
        GeometryApp.ui.updateStats();

        return { success: true, connection };
    }

    function updateConnections() {
        const points = GeometryApp.state.points;
        GeometryApp.state.lines.forEach(conn => {
            const from = points.find(p => p.name === conn.from);
            const to = points.find(p => p.name === conn.to);

            if (from && to) {
                scene.remove(conn.line);
                conn.line.geometry.dispose();
                conn.line.material.dispose();

                const newLine = createLineMesh(from, to, conn.color, conn.thickness);
                newLine.visible = conn.visible;
                scene.add(newLine);
                conn.line = newLine;
            }
        });
    }

    function removeConnectionsByPoint(pointName) {
        const toRemove = GeometryApp.state.lines.filter(c => 
            c.from === pointName || c.to === pointName
        );
        toRemove.forEach(conn => {
            conn.line.geometry.dispose();
            conn.line.material.dispose();
            scene.remove(conn.line);
            const index = GeometryApp.state.lines.indexOf(conn);
            if (index !== -1) GeometryApp.state.lines.splice(index, 1);
        });
        GeometryApp.ui.updateConnectionsList();
        GeometryApp.ui.updateStats();
    }

    function deleteConnection(index) {
        if (index >= 0 && index < GeometryApp.state.lines.length) {
            const conn = GeometryApp.state.lines[index];
            conn.line.geometry.dispose();
            conn.line.material.dispose();
            scene.remove(conn.line);
            GeometryApp.state.lines.splice(index, 1);
            GeometryApp.ui.updateConnectionsList();
            GeometryApp.ui.updateStats();
        }
    }

    function toggleConnectionVisibility(index) {
        if (index >= 0 && index < GeometryApp.state.lines.length) {
            const conn = GeometryApp.state.lines[index];
            conn.visible = !conn.visible;
            conn.line.visible = conn.visible;
            GeometryApp.ui.updateConnectionsList();
        }
    }

    function clearAll() {
        GeometryApp.state.lines.forEach(c => {
            c.line.geometry.dispose();
            c.line.material.dispose();
            scene.remove(c.line);
        });
        GeometryApp.state.lines = [];
        GeometryApp.ui.updateConnectionsList();
        GeometryApp.ui.updateStats();
    }

    return {
        init,
        connectPoints,
        updateConnections,
        removeConnectionsByPoint,
        deleteConnection,
        toggleConnectionVisibility,
        clearAll
    };
})();

// ===== PLANES MODULE (FIXED: Correct positioning using centroid) =====
GeometryApp.planes = (() => {
    let scene;
    let planeCounter = 1;

    function init(sceneRef) {
        scene = sceneRef;
    }

    function arePointsCollinear(p1, p2, p3) {
        const v1 = { 
            x: p2.x - p1.x, 
            y: p2.y - p1.y, 
            z: p2.z - p1.z 
        };
        const v2 = { 
            x: p3.x - p1.x, 
            y: p3.y - p1.y, 
            z: p3.z - p1.z 
        };
        
        const cross = {
            x: v1.y * v2.z - v1.z * v2.y,
            y: v1.z * v2.x - v1.x * v2.z,
            z: v1.x * v2.y - v1.y * v2.x
        };
        
        const magnitude = Math.sqrt(
            cross.x * cross.x + 
            cross.y * cross.y + 
            cross.z * cross.z
        );
        
        return magnitude < 0.0001;
    }

    function createPlane(pointNames, color = '#ff6b6b', opacity = 0.4) {
        if (pointNames.length < 3) {
            return { success: false, error: 'Need at least 3 points to create a plane' };
        }

        const points = GeometryApp.state.points;
        const selectedPoints = pointNames.map(name => 
            points.find(p => p.name === name)
        ).filter(p => p);

        if (selectedPoints.length < 3) {
            return { success: false, error: 'Invalid point selection' };
        }

        if (arePointsCollinear(selectedPoints[0], selectedPoints[1], selectedPoints[2])) {
            return { success: false, error: 'First 3 points are collinear. Cannot create plane.' };
        }

        // Calculate centroid
        const centroid = new THREE.Vector3();
        selectedPoints.forEach(p => {
            centroid.add(new THREE.Vector3(p.x, p.y, p.z));
        });
        centroid.divideScalar(selectedPoints.length);

        // Calculate plane normal
        const p1 = new THREE.Vector3(selectedPoints[0].x, selectedPoints[0].y, selectedPoints[0].z);
        const p2 = new THREE.Vector3(selectedPoints[1].x, selectedPoints[1].y, selectedPoints[1].z);
        const p3 = new THREE.Vector3(selectedPoints[2].x, selectedPoints[2].y, selectedPoints[2].z);

        const v1 = new THREE.Vector3().subVectors(p2, p1);
        const v2 = new THREE.Vector3().subVectors(p3, p1);
        const normal = new THREE.Vector3().crossVectors(v1, v2).normalize();

        // Create local coordinate system
        const localX = v1.normalize();
        const localY = new THREE.Vector3().crossVectors(normal, localX).normalize();

        // Project points onto plane's local 2D space
        const points2D = selectedPoints.map(sp => {
            const p = new THREE.Vector3(sp.x, sp.y, sp.z);
            const relative = new THREE.Vector3().subVectors(p, centroid);
            return {
                x: relative.dot(localX),
                y: relative.dot(localY)
            };
        });

        // Sort points by angle for convex hull
        points2D.sort((a, b) => {
            const angleA = Math.atan2(a.y, a.x);
            const angleB = Math.atan2(b.y, b.x);
            return angleA - angleB;
        });

        // Create shape
        const shape = new THREE.Shape();
        shape.moveTo(points2D[0].x, points2D[0].y);
        for (let i = 1; i < points2D.length; i++) {
            shape.lineTo(points2D[i].x, points2D[i].y);
        }
        shape.closePath();

        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshPhongMaterial({ 
            color: color,
            transparent: true,
            opacity: opacity,
            side: THREE.DoubleSide,
            depthWrite: false
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        // Position at centroid
        mesh.position.copy(centroid);
        
        // Orient the mesh
        const up = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion();
        
        if (Math.abs(normal.dot(up)) < 0.999) {
            const rotationAxis = new THREE.Vector3().crossVectors(up, normal).normalize();
            const rotationAngle = Math.acos(up.dot(normal));
            quaternion.setFromAxisAngle(rotationAxis, rotationAngle);
        } else if (normal.dot(up) < 0) {
            quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
        }
        
        mesh.setRotationFromQuaternion(quaternion);

        scene.add(mesh);

        const plane = {
            name: `Plane${planeCounter++}`,
            pointNames: pointNames,
            color,
            opacity,
            normal: { x: normal.x, y: normal.y, z: normal.z },
            mesh,
            visible: true
        };

        GeometryApp.state.planes.push(plane);
        GeometryApp.ui.updatePlanesList();
        GeometryApp.ui.updateStats();

        return { success: true, plane };
    }

    function updatePlanes() {
        GeometryApp.state.planes.forEach(plane => {
            const points = GeometryApp.state.points;
            const selectedPoints = plane.pointNames.map(name => 
                points.find(p => p.name === name)
            ).filter(p => p);

            if (selectedPoints.length < 3) return;

            scene.remove(plane.mesh);
            plane.mesh.geometry.dispose();
            plane.mesh.material.dispose();

            const centroid = new THREE.Vector3();
            selectedPoints.forEach(p => {
                centroid.add(new THREE.Vector3(p.x, p.y, p.z));
            });
            centroid.divideScalar(selectedPoints.length);

            const p1 = new THREE.Vector3(selectedPoints[0].x, selectedPoints[0].y, selectedPoints[0].z);
            const p2 = new THREE.Vector3(selectedPoints[1].x, selectedPoints[1].y, selectedPoints[1].z);
            const p3 = new THREE.Vector3(selectedPoints[2].x, selectedPoints[2].y, selectedPoints[2].z);

            const v1 = new THREE.Vector3().subVectors(p2, p1);
            const v2 = new THREE.Vector3().subVectors(p3, p1);
            const normal = new THREE.Vector3().crossVectors(v1, v2).normalize();

            const localX = v1.normalize();
            const localY = new THREE.Vector3().crossVectors(normal, localX).normalize();

            const points2D = selectedPoints.map(sp => {
                const p = new THREE.Vector3(sp.x, sp.y, sp.z);
                const relative = new THREE.Vector3().subVectors(p, centroid);
                return {
                    x: relative.dot(localX),
                    y: relative.dot(localY)
                };
            });

            points2D.sort((a, b) => {
                const angleA = Math.atan2(a.y, a.x);
                const angleB = Math.atan2(b.y, b.x);
                return angleA - angleB;
            });

            const shape = new THREE.Shape();
            shape.moveTo(points2D[0].x, points2D[0].y);
            for (let i = 1; i < points2D.length; i++) {
                shape.lineTo(points2D[i].x, points2D[i].y);
            }
            shape.closePath();

            const geometry = new THREE.ShapeGeometry(shape);
            const material = new THREE.MeshPhongMaterial({ 
                color: plane.color,
                transparent: true,
                opacity: plane.opacity,
                side: THREE.DoubleSide,
                depthWrite: false
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(centroid);
            
            const up = new THREE.Vector3(0, 1, 0);
            const quaternion = new THREE.Quaternion();
            
            if (Math.abs(normal.dot(up)) < 0.999) {
                const rotationAxis = new THREE.Vector3().crossVectors(up, normal).normalize();
                const rotationAngle = Math.acos(up.dot(normal));
                quaternion.setFromAxisAngle(rotationAxis, rotationAngle);
            } else if (normal.dot(up) < 0) {
                quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
            }
            
            mesh.setRotationFromQuaternion(quaternion);
            mesh.visible = plane.visible;

            scene.add(mesh);
            plane.mesh = mesh;
        });
    }

    function deletePlane(name) {
        const index = GeometryApp.state.planes.findIndex(p => p.name === name);
        if (index !== -1) {
            const plane = GeometryApp.state.planes[index];
            plane.mesh.geometry.dispose();
            plane.mesh.material.dispose();
            scene.remove(plane.mesh);
            GeometryApp.state.planes.splice(index, 1);
            GeometryApp.ui.updatePlanesList();
            GeometryApp.ui.updateStats();
        }
    }

    function togglePlaneVisibility(name) {
        const plane = GeometryApp.state.planes.find(p => p.name === name);
        if (plane) {
            plane.visible = !plane.visible;
            plane.mesh.visible = plane.visible;
            GeometryApp.ui.updatePlanesList();
        }
    }

    function clearAll() {
        GeometryApp.state.planes.forEach(p => {
            p.mesh.geometry.dispose();
            p.mesh.material.dispose();
            scene.remove(p.mesh);
        });
        GeometryApp.state.planes = [];
        planeCounter = 1;
        GeometryApp.ui.updatePlanesList();
        GeometryApp.ui.updateStats();
    }

    return {
        init,
        createPlane,
        updatePlanes,
        deletePlane,
        togglePlaneVisibility,
        clearAll
    };
})();

// ===== SHAPES MODULE (Z = HEIGHT) =====
GeometryApp.shapes = (() => {
    function createTriangle() {
        const p1 = GeometryApp.points.addPoint(-2, 0, 0, '#3b82f6');
        const p2 = GeometryApp.points.addPoint(2, 0, 0, '#3b82f6');
        const p3 = GeometryApp.points.addPoint(0, 3, 0, '#3b82f6');

        GeometryApp.lines.connectPoints(p1.name, p2.name);
        GeometryApp.lines.connectPoints(p2.name, p3.name);
        GeometryApp.lines.connectPoints(p3.name, p1.name);
    }

    function createTetrahedron() {
        const h = Math.sqrt(2/3) * 2;
        const p1 = GeometryApp.points.addPoint(0, 0, h, '#3b82f6');
        const p2 = GeometryApp.points.addPoint(-1, -1/Math.sqrt(3), 0, '#3b82f6');
        const p3 = GeometryApp.points.addPoint(1, -1/Math.sqrt(3), 0, '#3b82f6');
        const p4 = GeometryApp.points.addPoint(0, 2/Math.sqrt(3), 0, '#3b82f6');

        GeometryApp.lines.connectPoints(p1.name, p2.name);
        GeometryApp.lines.connectPoints(p1.name, p3.name);
        GeometryApp.lines.connectPoints(p1.name, p4.name);
        GeometryApp.lines.connectPoints(p2.name, p3.name);
        GeometryApp.lines.connectPoints(p3.name, p4.name);
        GeometryApp.lines.connectPoints(p4.name, p2.name);
    }

    function createCube() {
        const s = 2;
        const p1 = GeometryApp.points.addPoint(-s, -s, -s, '#3b82f6');
        const p2 = GeometryApp.points.addPoint(s, -s, -s, '#3b82f6');
        const p3 = GeometryApp.points.addPoint(s, s, -s, '#3b82f6');
        const p4 = GeometryApp.points.addPoint(-s, s, -s, '#3b82f6');
        const p5 = GeometryApp.points.addPoint(-s, -s, s, '#3b82f6');
        const p6 = GeometryApp.points.addPoint(s, -s, s, '#3b82f6');
        const p7 = GeometryApp.points.addPoint(s, s, s, '#3b82f6');
        const p8 = GeometryApp.points.addPoint(-s, s, s, '#3b82f6');

        GeometryApp.lines.connectPoints(p1.name, p2.name);
        GeometryApp.lines.connectPoints(p2.name, p3.name);
        GeometryApp.lines.connectPoints(p3.name, p4.name);
        GeometryApp.lines.connectPoints(p4.name, p1.name);

        GeometryApp.lines.connectPoints(p5.name, p6.name);
        GeometryApp.lines.connectPoints(p6.name, p7.name);
        GeometryApp.lines.connectPoints(p7.name, p8.name);
        GeometryApp.lines.connectPoints(p8.name, p5.name);

        GeometryApp.lines.connectPoints(p1.name, p5.name);
        GeometryApp.lines.connectPoints(p2.name, p6.name);
        GeometryApp.lines.connectPoints(p3.name, p7.name);
        GeometryApp.lines.connectPoints(p4.name, p8.name);
    }

    function createPrism() {
        const p1 = GeometryApp.points.addPoint(-2, 0, -2, '#3b82f6');
        const p2 = GeometryApp.points.addPoint(2, 0, -2, '#3b82f6');
        const p3 = GeometryApp.points.addPoint(0, 3, -2, '#3b82f6');
        const p4 = GeometryApp.points.addPoint(-2, 0, 2, '#3b82f6');
        const p5 = GeometryApp.points.addPoint(2, 0, 2, '#3b82f6');
        const p6 = GeometryApp.points.addPoint(0, 3, 2, '#3b82f6');

        GeometryApp.lines.connectPoints(p1.name, p2.name);
        GeometryApp.lines.connectPoints(p2.name, p3.name);
        GeometryApp.lines.connectPoints(p3.name, p1.name);

        GeometryApp.lines.connectPoints(p4.name, p5.name);
        GeometryApp.lines.connectPoints(p5.name, p6.name);
        GeometryApp.lines.connectPoints(p6.name, p4.name);

        GeometryApp.lines.connectPoints(p1.name, p4.name);
        GeometryApp.lines.connectPoints(p2.name, p5.name);
        GeometryApp.lines.connectPoints(p3.name, p6.name);
    }

    function createPyramid() {
        const s = 2;
        const h = 3;
        const p1 = GeometryApp.points.addPoint(-s, -s, 0, '#3b82f6');
        const p2 = GeometryApp.points.addPoint(s, -s, 0, '#3b82f6');
        const p3 = GeometryApp.points.addPoint(s, s, 0, '#3b82f6');
        const p4 = GeometryApp.points.addPoint(-s, s, 0, '#3b82f6');
        const p5 = GeometryApp.points.addPoint(0, 0, h, '#3b82f6');

        GeometryApp.lines.connectPoints(p1.name, p2.name);
        GeometryApp.lines.connectPoints(p2.name, p3.name);
        GeometryApp.lines.connectPoints(p3.name, p4.name);
        GeometryApp.lines.connectPoints(p4.name, p1.name);

        GeometryApp.lines.connectPoints(p1.name, p5.name);
        GeometryApp.lines.connectPoints(p2.name, p5.name);
        GeometryApp.lines.connectPoints(p3.name, p5.name);
        GeometryApp.lines.connectPoints(p4.name, p5.name);
    }

    return {
        createTriangle,
        createTetrahedron,
        createCube,
        createPrism,
        createPyramid
    };
})();

// ===== SETTINGS MODULE =====
GeometryApp.settings = (() => {
    function toggleAxes(visible) {
        const axes = GeometryApp.scene.getAxes();
        if (axes) axes.visible = visible;
        GeometryApp.state.settings.showAxes = visible;
    }

    function toggleGrid(visible) {
        const grid = GeometryApp.scene.getGrid();
        if (grid) grid.visible = visible;
        GeometryApp.state.settings.showGrid = visible;
    }

    function toggleLabels(visible) {
        GeometryApp.state.settings.showLabels = visible;
        GeometryApp.state.points.forEach(point => {
            if (point.label && point.label.element) {
                point.label.element.style.display = visible ? '' : 'none';
            }
        });
    }

    function setBackgroundColor(color) {
        const scene = GeometryApp.scene.getScene();
        if (scene) scene.background = new THREE.Color(color);
    }

    return {
        toggleAxes,
        toggleGrid,
        toggleLabels,
        setBackgroundColor
    };
})();

// ===== STORAGE MODULE =====
GeometryApp.storage = (() => {
    async function save() {
        const data = {
            points: GeometryApp.state.points.map(p => ({
                name: p.name,
                id: p.id,
                x: p.x,
                y: p.y,
                z: p.z,
                color: p.color,
                visible: p.visible
            })),
            lines: GeometryApp.state.lines.map(c => ({
                from: c.from,
                to: c.to,
                color: c.color,
                thickness: c.thickness,
                visible: c.visible
            })),
            planes: GeometryApp.state.planes.map(p => ({
                name: p.name,
                pointNames: p.pointNames,
                color: p.color,
                opacity: p.opacity,
                visible: p.visible
            })),
            availablePointIds: GeometryApp.state.availablePointIds,
            settings: {
                bgColor: document.getElementById('bg-color')?.value || '#2a2a2a',
                showAxes: document.getElementById('toggle-axes')?.checked || true,
                showGrid: document.getElementById('toggle-grid')?.checked || true,
                showLabels: document.getElementById('toggle-labels')?.checked || true
            }
        };

        try {
            if (window.storage && typeof window.storage.set === 'function') {
                await window.storage.set('geometry-model', JSON.stringify(data));
                await GeometryApp.modal.alert('Success', 'Model saved successfully!');
            } else {
                localStorage.setItem('geometry-model', JSON.stringify(data));
                await GeometryApp.modal.alert('Success', 'Model saved to browser storage!');
            }
        } catch (error) {
            console.error('Save failed:', error);
            await GeometryApp.modal.alert('Error', 'Failed to save model. See console for details.');
        }
    }

    async function load() {
        try {
            let dataStr = null;
            
            if (window.storage && typeof window.storage.get === 'function') {
                const result = await window.storage.get('geometry-model');
                dataStr = result ? result.value : null;
            } else {
                dataStr = localStorage.getItem('geometry-model');
            }

            if (!dataStr) {
                await GeometryApp.modal.alert('No Data', 'No saved model found');
                return;
            }

            const data = JSON.parse(dataStr);
            
            clearAll(false);

            GeometryApp.state.availablePointIds = data.availablePointIds || [];

            data.points.forEach(p => {
                GeometryApp.points.addPoint(p.x, p.y, p.z, p.color, p.name);
            });

            data.lines.forEach(c => {
                GeometryApp.lines.connectPoints(c.from, c.to, c.color, c.thickness);
            });

            if (data.planes) {
                data.planes.forEach(p => {
                    GeometryApp.planes.createPlane(p.pointNames, p.color, p.opacity);
                });
            }

            if (data.settings) {
                const bgInput = document.getElementById('bg-color');
                if (bgInput) bgInput.value = data.settings.bgColor;
                GeometryApp.settings.setBackgroundColor(data.settings.bgColor);
                
                const axesCheck = document.getElementById('toggle-axes');
                if (axesCheck) axesCheck.checked = data.settings.showAxes;
                GeometryApp.settings.toggleAxes(data.settings.showAxes);
                
                const gridCheck = document.getElementById('toggle-grid');
                if (gridCheck) gridCheck.checked = data.settings.showGrid;
                GeometryApp.settings.toggleGrid(data.settings.showGrid);
                
                if (data.settings.showLabels !== undefined) {
                    const labelsCheck = document.getElementById('toggle-labels');
                    if (labelsCheck) labelsCheck.checked = data.settings.showLabels;
                    GeometryApp.settings.toggleLabels(data.settings.showLabels);
                }
            }

            await GeometryApp.modal.alert('Success', 'Model loaded successfully!');
        } catch (error) {
            console.error('Load failed:', error);
            await GeometryApp.modal.alert('Error', 'Failed to load model. See console for details.');
        }
    }

    function exportJSON() {
        const data = {
            points: GeometryApp.state.points.map(p => ({
                name: p.name,
                x: p.x,
                y: p.y,
                z: p.z,
                color: p.color
            })),
            lines: GeometryApp.state.lines.map(c => ({
                from: c.from,
                to: c.to,
                color: c.color
            })),
            planes: GeometryApp.state.planes.map(p => ({
                name: p.name,
                pointNames: p.pointNames,
                color: p.color,
                opacity: p.opacity
            }))
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'geometry-model.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    async function clearAll(askConfirmation = true) {
        if (askConfirmation) {
            const confirmed = await GeometryApp.modal.confirm(
                'Clear All',
                'Are you sure you want to clear all points, lines, and planes?'
            );
            if (!confirmed) return;
        }
        
        GeometryApp.planes.clearAll();
        GeometryApp.lines.clearAll();
        GeometryApp.points.clearAll();
        
        try {
            if (window.storage && typeof window.storage.delete === 'function') {
                await window.storage.delete('geometry-model');
            } else if (typeof localStorage !== 'undefined') {
                localStorage.removeItem('geometry-model');
            }
        } catch (error) {
            console.warn('Storage cleanup failed (non-critical):', error);
        }
    }

    return { save, load, exportJSON, clearAll };
})();

// ===== UI MODULE (DOM-SAFE) =====
GeometryApp.ui = (() => {
    function init() {
        const addPointBtn = document.getElementById('add-point-btn');
        if (addPointBtn) {
            addPointBtn.addEventListener('click', () => {
                const x = parseFloat(document.getElementById('point-x')?.value || 0);
                const y = parseFloat(document.getElementById('point-y')?.value || 0);
                const z = parseFloat(document.getElementById('point-z')?.value || 0);
                const color = document.getElementById('point-color')?.value || '#3b82f6';
                GeometryApp.points.addPoint(x, y, z, color);
            });
        }

        const connectBtn = document.getElementById('connect-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => {
                const from = document.getElementById('point-from')?.value;
                const to = document.getElementById('point-to')?.value;
                const color = document.getElementById('line-color')?.value || '#00ff00';
                const thickness = parseFloat(document.getElementById('line-thickness-input')?.value || 0.05);
                
                if (from && to && from !== to) {
                    const result = GeometryApp.lines.connectPoints(from, to, color, thickness);
                    
                    const alert = document.getElementById('line-alert');
                    if (alert) {
                        if (!result.success) {
                            alert.innerHTML = `<div class="alert alert-warning">${result.error}</div>`;
                            setTimeout(() => alert.innerHTML = '', 5000);
                        } else {
                            alert.innerHTML = '';
                        }
                    }
                }
            });
        }

        const createPlaneBtn = document.getElementById('create-plane-btn');
        if (createPlaneBtn) {
            createPlaneBtn.addEventListener('click', () => {
                const selector = document.getElementById('plane-point-selector');
                if (!selector) return;
                
                const checkboxes = selector.querySelectorAll('input[type="checkbox"]:checked');
                const selectedPoints = Array.from(checkboxes).map(cb => cb.value);
                
                const color = document.getElementById('plane-color')?.value || '#ff6b6b';
                const opacity = parseFloat(document.getElementById('plane-opacity')?.value || 0.4);
                
                const result = GeometryApp.planes.createPlane(selectedPoints, color, opacity);
                
                const alert = document.getElementById('plane-alert');
                if (alert) {
                    if (!result.success) {
                        alert.innerHTML = `<div class="alert alert-error">${result.error}</div>`;
                        setTimeout(() => alert.innerHTML = '', 5000);
                    } else {
                        alert.innerHTML = `<div class="alert alert-success">Plane created successfully!</div>`;
                        setTimeout(() => alert.innerHTML = '', 3000);
                        checkboxes.forEach(cb => {
                            cb.checked = false;
                            const item = cb.closest('.multi-select-item');
                            if (item) item.classList.remove('selected');
                        });
                    }
                }
            });
        }

        // Event listeners
        const thicknessInput = document.getElementById('line-thickness-input');
        const thicknessValue = document.getElementById('thickness-value');
        if (thicknessInput && thicknessValue) {
            thicknessInput.addEventListener('input', (e) => {
                thicknessValue.textContent = e.target.value;
            });
        }

        const opacityInput = document.getElementById('plane-opacity');
        const opacityValue = document.getElementById('opacity-value');
        if (opacityInput && opacityValue) {
            opacityInput.addEventListener('input', (e) => {
                opacityValue.textContent = e.target.value;
            });
        }

        // Settings
        const toggleAxes = document.getElementById('toggle-axes');
        if (toggleAxes) {
            toggleAxes.addEventListener('change', (e) => {
                GeometryApp.settings.toggleAxes(e.target.checked);
            });
        }

        const toggleGrid = document.getElementById('toggle-grid');
        if (toggleGrid) {
            toggleGrid.addEventListener('change', (e) => {
                GeometryApp.settings.toggleGrid(e.target.checked);
            });
        }

        const toggleLabels = document.getElementById('toggle-labels');
        if (toggleLabels) {
            toggleLabels.addEventListener('change', (e) => {
                GeometryApp.settings.toggleLabels(e.target.checked);
            });
        }

        const bgColor = document.getElementById('bg-color');
        if (bgColor) {
            bgColor.addEventListener('change', (e) => {
                GeometryApp.settings.setBackgroundColor(e.target.value);
            });
        }

        const defaultPointColor = document.getElementById('default-point-color');
        const pointColor = document.getElementById('point-color');
        if (defaultPointColor && pointColor) {
            defaultPointColor.addEventListener('change', (e) => {
                pointColor.value = e.target.value;
            });
        }

        const defaultLineColor = document.getElementById('default-line-color');
        const lineColor = document.getElementById('line-color');
        if (defaultLineColor && lineColor) {
            defaultLineColor.addEventListener('change', (e) => {
                lineColor.value = e.target.value;
            });
        }

        // Storage buttons
        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => GeometryApp.storage.save());
        }

        const loadBtn = document.getElementById('load-btn');
        if (loadBtn) {
            loadBtn.addEventListener('click', () => GeometryApp.storage.load());
        }

        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => GeometryApp.storage.exportJSON());
        }

        const clearBtn = document.getElementById('clear-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => GeometryApp.storage.clearAll());
        }

        // Language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                if (lang) GeometryApp.lang.setLanguage(lang);
            });
        });

        // Shape buttons
        document.querySelectorAll('[data-shape]').forEach(btn => {
            btn.addEventListener('click', () => {
                const shape = btn.dataset.shape;
                if (shape && GeometryApp.shapes[`create${shape.charAt(0).toUpperCase() + shape.slice(1)}`]) {
                    GeometryApp.shapes[`create${shape.charAt(0).toUpperCase() + shape.slice(1)}`]();
                }
            });
        });
    }

    function updatePointsTable() {
        const tbody = document.getElementById('points-table');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        GeometryApp.state.points.forEach(point => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>
                    <input type="text" value="${point.name}" 
                        onblur="GeometryApp.ui.handleRename('${point.name}', this.value, this)"
                        style="width: 60px;">
                </td>
                <td><input type="number" value="${point.x.toFixed(2)}" step="0.1" 
                    onchange="GeometryApp.points.updatePoint('${point.name}', parseFloat(this.value), ${point.y}, ${point.z})"></td>
                <td><input type="number" value="${point.y.toFixed(2)}" step="0.1" 
                    onchange="GeometryApp.points.updatePoint('${point.name}', ${point.x}, parseFloat(this.value), ${point.z})"></td>
                <td><input type="number" value="${point.z.toFixed(2)}" step="0.1" 
                    onchange="GeometryApp.points.updatePoint('${point.name}', ${point.x}, ${point.y}, parseFloat(this.value))"></td>
                <td>
                    <button class="btn-danger btn-small" onclick="GeometryApp.points.deletePoint('${point.name}')">✕</button>
                </td>
            `;
        });
    }

    async function handleRename(oldName, newName, inputElement) {
        if (oldName === newName) return;
        
        const result = GeometryApp.points.renamePoint(oldName, newName);
        if (!result.success) {
            await GeometryApp.modal.alert('Invalid Name', result.error);
            inputElement.value = oldName;
            inputElement.classList.add('error');
            setTimeout(() => inputElement.classList.remove('error'), 2000);
        }
    }

    function updatePointSelectors() {
        const fromSelect = document.getElementById('point-from');
        const toSelect = document.getElementById('point-to');
        if (!fromSelect || !toSelect) return;
        
        const points = GeometryApp.state.points;
        
        fromSelect.innerHTML = '<option>Select start point...</option>';
        toSelect.innerHTML = '<option>Select end point...</option>';
        
        points.forEach(point => {
            fromSelect.innerHTML += `<option value="${point.name}">${point.name}</option>`;
            toSelect.innerHTML += `<option value="${point.name}">${point.name}</option>`;
        });
    }

    function updatePlanePointSelector() {
        const selector = document.getElementById('plane-point-selector');
        if (!selector) return;
        
        selector.innerHTML = '';

        if (GeometryApp.state.points.length === 0) {
            selector.innerHTML = '<div class="empty-state">No points available</div>';
            return;
        }

        GeometryApp.state.points.forEach(point => {
            const div = document.createElement('div');
            div.className = 'multi-select-item';
            div.innerHTML = `
                <input type="checkbox" value="${point.name}" id="plane-pt-${point.name}">
                <label for="plane-pt-${point.name}">${point.name} (${point.x.toFixed(1)}, ${point.y.toFixed(1)}, ${point.z.toFixed(1)})</label>
            `;
            
            div.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT') {
                    const checkbox = div.querySelector('input');
                    if (checkbox) checkbox.checked = !checkbox.checked;
                }
                const checkbox = div.querySelector('input');
                div.classList.toggle('selected', checkbox?.checked || false);
            });
            
            selector.appendChild(div);
        });
    }

    function updateConnectionsList() {
        const list = document.getElementById('connections-list');
        if (!list) return;
        
        list.innerHTML = '';

        if (GeometryApp.state.lines.length === 0) {
            list.innerHTML = '<div class="empty-state">No connections</div>';
            return;
        }

        GeometryApp.state.lines.forEach((conn, index) => {
            const div = document.createElement('div');
            div.className = 'connection-item';
            div.innerHTML = `
                <div class="connection-info">
                    ${conn.from} ↔ ${conn.to}
                </div>
                <div class="item-actions">
                    <button class="btn-secondary btn-small" onclick="GeometryApp.lines.toggleConnectionVisibility(${index})">
                        ${conn.visible ? '👁️' : '🚫'}
                    </button>
                    <button class="btn-danger btn-small" onclick="GeometryApp.lines.deleteConnection(${index})">✕</button>
                </div>
            `;
            list.appendChild(div);
        });
    }

    function updatePlanesList() {
        const list = document.getElementById('planes-list');
        if (!list) return;
        
        list.innerHTML = '';

        if (GeometryApp.state.planes.length === 0) {
            list.innerHTML = '<div class="empty-state">No planes created</div>';
            return;
        }

        GeometryApp.state.planes.forEach((plane) => {
            const div = document.createElement('div');
            div.className = 'plane-item';
            div.innerHTML = `
                <div class="plane-info">
                    <strong>${plane.name}</strong>
                    <div class="points-list">Points: ${plane.pointNames.join(', ')}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-secondary btn-small" onclick="GeometryApp.planes.togglePlaneVisibility('${plane.name}')">
                        ${plane.visible ? '👁️' : '🚫'}
                    </button>
                    <button class="btn-danger btn-small" onclick="GeometryApp.planes.deletePlane('${plane.name}')">✕</button>
                </div>
            `;
            list.appendChild(div);
        });
    }

    function updateStats() {
        const stats = document.getElementById('stats-display');
        if (!stats) return;
        
        stats.innerHTML = `
            <strong>Current Model:</strong><br>
            Points: ${GeometryApp.state.points.length} | 
            Lines: ${GeometryApp.state.lines.length} | 
            Planes: ${GeometryApp.state.planes.length}
        `;
    }

    return {
        init,
        updatePointsTable,
        updatePointSelectors,
        updatePlanePointSelector,
        updateConnectionsList,
        updatePlanesList,
        updateStats,
        handleRename
    };
})();

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modal system
    GeometryApp.modal.init();
    
    // Initialize scene
    const { scene, camera, renderer } = GeometryApp.scene.init();
    
    // Initialize controls
    GeometryApp.controls.init(camera, renderer);
    
    // Initialize modules
    GeometryApp.points.init(scene);
    GeometryApp.lines.init(scene);
    GeometryApp.planes.init(scene);
    GeometryApp.ui.init();
    
    // Set initial language
    GeometryApp.lang.setLanguage('en');
    
    // Start animation loop
    GeometryApp.scene.animate();
    
    // Initial UI update
    GeometryApp.ui.updateStats();
});