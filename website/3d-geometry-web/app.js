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

// ===== CSS2D RENDERER =====
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
        this.domElement.style.left = '0';
        this.domElement.style.pointerEvents = 'none';
        this.domElement.style.zIndex = '1';
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
                    // Ensure element is in the DOM
                    if (!object.element.parentNode) {
                        this.domElement.appendChild(object.element);
                    }
                    
                    // Get world position
                    const worldPosition = new THREE.Vector3();
                    worldPosition.setFromMatrixPosition(object.matrixWorld);
                    
                    // Calculate distance from camera for scaling
                    const distanceToCamera = camera.position.distanceTo(worldPosition);
                    
                    // Scale based on distance with min/max bounds
                    // Using inverse relationship: closer = larger, farther = smaller
                    const referenceDistance = 15; // Distance where scale = 1.0
                    let scale = referenceDistance / distanceToCamera;
                    
                    // Apply strict min and max bounds
                    const minScale = 0.3;  // Minimum size when zoomed out far
                    const maxScale = 0.8;  // Maximum size when zoomed in close
                    scale = Math.max(minScale, Math.min(maxScale, scale));
                    
                    vector.copy(worldPosition);
                    vector.applyMatrix4(viewMatrix);
                    vector.applyMatrix4(projectionMatrix);

                    const widthHalf = this.domElement.clientWidth / 2;
                    const heightHalf = this.domElement.clientHeight / 2;

                    const x = (vector.x * widthHalf) + widthHalf;
                    const y = -(vector.y * heightHalf) + heightHalf;

                    object.element.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px) scale(${scale})`;
                    const shouldShow = (vector.z < 1) && GeometryApp.state.settings.showLabels;
                    object.element.style.display = shouldShow ? '' : 'none';
                }
            });
        }
}

// ===== LANGUAGE MODULE (EXPANDED WITH MODAL TRANSLATIONS) =====
GeometryApp.lang = (() => {
    const translations = {
        en: {
            // UI translations
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
            'lang-clear': 'Clear All',
            
            // Modal translations
            'modal-confirm': 'Confirm',
            'modal-cancel': 'Cancel',
            'modal-ok': 'OK',
            'modal-delete-point-title': 'Delete Point',
            'modal-delete-point-message': 'Point {name} is used by plane(s): {planes}.\nDeleting this point will also delete these planes.\n\nContinue?',
            'modal-clear-all-title': 'Clear All',
            'modal-clear-all-message': 'Are you sure you want to clear all points, lines, and planes?',
            'modal-success-title': 'Success',
            'modal-save-success': 'Model saved successfully!',
            'modal-save-local': 'Model saved to browser storage!',
            'modal-load-success': 'Model loaded successfully!',
            'modal-error-title': 'Error',
            'modal-save-error': 'Failed to save model. See console for details.',
            'modal-load-error': 'Failed to load model. See console for details.',
            'modal-no-data-title': 'No Data',
            'modal-no-data-message': 'No saved model found',
            'modal-invalid-name-title': 'Invalid Name',
            'modal-invalid-name-message': 'Name must be 1-5 chars (a-z, 0-9, -)',
            'modal-name-exists': 'Name already exists',

            'error-invalid-points': 'The points used to create the plane are invalid',
            'error-need-3-points': 'Need at least 3 points to create a plane',
            'error-collinear-points': 'First 3 points are collinear. Cannot create plane.',
            'error-not-coplanar': 'Selected points are not coplanar. Cannot create plane.',
            'success-plane-created': 'Plane created successfully!',
            'error-plane-exists': 'A plane with these points already exists',
            'error-connection-exists': 'Connection already exists between these points',
        },
        vi: {
            // UI translations
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
            'lang-clear': 'Xóa Tất Cả',
            
            // Modal translations
            'modal-confirm': 'Xác nhận',
            'modal-cancel': 'Hủy',
            'modal-ok': 'OK',
            'modal-delete-point-title': 'Xóa Điểm',
            'modal-delete-point-message': 'Điểm {name} đang được sử dụng bởi mặt phẳng: {planes}.\nXóa điểm này cũng sẽ xóa các mặt phẳng đó.\n\nTiếp tục?',
            'modal-clear-all-title': 'Xóa Tất Cả',
            'modal-clear-all-message': 'Bạn có chắc chắn muốn xóa tất cả điểm, đường và mặt phẳng?',
            'modal-success-title': 'Thành Công',
            'modal-save-success': 'Mô hình đã được lưu thành công!',
            'modal-save-local': 'Mô hình đã được lưu vào bộ nhớ trình duyệt!',
            'modal-load-success': 'Mô hình đã được tải thành công!',
            'modal-error-title': 'Lỗi',
            'modal-save-error': 'Không thể lưu mô hình. Xem console để biết chi tiết.',
            'modal-load-error': 'Không thể tải mô hình. Xem console để biết chi tiết.',
            'modal-no-data-title': 'Không Có Dữ Liệu',
            'modal-no-data-message': 'Không tìm thấy mô hình đã lưu',
            'modal-invalid-name-title': 'Tên Không Hợp Lệ',
            'modal-invalid-name-message': 'Tên phải có 1-5 ký tự (a-z, 0-9, -)',
            'modal-name-exists': 'Tên đã tồn tại',

            'error-invalid-points': 'Các điểm được sử dụng để tạo mặt phẳng không hợp lệ',
            'error-need-3-points': 'Cần ít nhất 3 điểm để tạo mặt phẳng',
            'error-collinear-points': 'Ba điểm đầu tiên thẳng hàng. Không thể tạo mặt phẳng.',
            'error-not-coplanar': 'Các điểm đã chọn không cùng nằm trên một mặt phẳng. Không thể tạo mặt phẳng.',
            'success-plane-created': 'Mặt phẳng đã được tạo thành công!',
            'error-plane-exists': 'Mặt phẳng với các điểm này đã tồn tại',
            'error-connection-exists': 'Kết nối giữa các điểm này đã tồn tại',
        },
        jp: {
            // UI translations
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
            'lang-clear': '全てクリア',
            
            // Modal translations
            'modal-confirm': '確認',
            'modal-cancel': 'キャンセル',
            'modal-ok': 'OK',
            'modal-delete-point-title': 'ポイントを削除',
            'modal-delete-point-message': 'ポイント {name} は平面 {planes} で使用されています。\nこのポイントを削除すると、これらの平面も削除されます。\n\n続行しますか？',
            'modal-clear-all-title': '全てクリア',
            'modal-clear-all-message': '全てのポイント、ライン、平面をクリアしてもよろしいですか？',
            'modal-success-title': '成功',
            'modal-save-success': 'モデルが正常に保存されました！',
            'modal-save-local': 'モデルがブラウザストレージに保存されました！',
            'modal-load-success': 'モデルが正常に読み込まれました！',
            'modal-error-title': 'エラー',
            'modal-save-error': 'モデルの保存に失敗しました。詳細はコンソールをご確認ください。',
            'modal-load-error': 'モデルの読み込みに失敗しました。詳細はコンソールをご確認ください。',
            'modal-no-data-title': 'データなし',
            'modal-no-data-message': '保存されたモデルが見つかりません',
            'modal-invalid-name-title': '無効な名前',
            'modal-invalid-name-message': '名前は1〜5文字（a-z、0-9、-）である必要があります',
            'modal-name-exists': '名前は既に存在します',
            'error-invalid-points': '平面の作成に使用されたポイントが無効です',
            'error-need-3-points': '平面を作成するには少なくとも3つのポイントが必要です',
            'error-collinear-points': '最初の3点が一直線上にあります。平面を作成できません。',
            'error-not-coplanar': '選択されたポイントは同一平面上にありません。平面を作成できません。',
            'success-plane-created': '平面が正常に作成されました！',
            'error-plane-exists': 'これらのポイントを持つ平面は既に存在します',
            'error-connection-exists': 'これらのポイント間の接続は既に存在します',
        }
    };

    function t(key, params = {}) {
        const lang = GeometryApp.state.language;
        let text = translations[lang]?.[key] || translations['en'][key] || key;
        
        // Replace parameters
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        
        return text;
    }

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

    return { setLanguage, t };
})();

// ===== MODAL SYSTEM (FULLY MULTILINGUAL) =====
GeometryApp.modal = (() => {
    let overlay, title, message, confirmBtn, cancelBtn, closeBtn;
    let confirmText, cancelText;
    let resolveCallback = null;

    function init() {
        overlay = document.getElementById('modal-overlay');
        title = document.getElementById('modal-title');
        message = document.getElementById('modal-message');
        confirmBtn = document.getElementById('modal-confirm');
        cancelBtn = document.getElementById('modal-cancel');
        closeBtn = document.getElementById('modal-close');
        confirmText = document.getElementById('modal-confirm-text');
        cancelText = document.getElementById('modal-cancel-text');

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

    function updateTexts(showCancel) {
        if (confirmText) {
            confirmText.textContent = showCancel ? GeometryApp.lang.t('modal-confirm') : GeometryApp.lang.t('modal-ok');
        }
        if (cancelText) {
            cancelText.textContent = GeometryApp.lang.t('modal-cancel');
        }
    }

    function show(titleText, messageText, showCancel = true) {
        if (!overlay) return Promise.resolve(false);

        title.textContent = titleText;
        message.textContent = messageText;
        cancelBtn.style.display = showCancel ? 'block' : 'none';
        updateTexts(showCancel);
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

    function alert(titleKey, messageKey, params = {}) {
        const titleText = GeometryApp.lang.t(titleKey, params);
        const messageText = GeometryApp.lang.t(messageKey, params);
        return show(titleText, messageText, false);
    }

    function confirm(titleKey, messageKey, params = {}) {
        const titleText = GeometryApp.lang.t(titleKey, params);
        const messageText = GeometryApp.lang.t(messageKey, params);
        return show(titleText, messageText, true);
    }

    return { init, show, hide, alert, confirm };
})();

// ===== SCENE MODULE =====
GeometryApp.scene = (() => {
    let scene, camera, renderer, labelRenderer;
    let axes, grid;
    const container = document.getElementById('canvas-container');

    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);

        camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.up.set(0, 0, 1);
        camera.position.set(10, 10, 10);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(labelRenderer.domElement);

        axes = new THREE.AxesHelper(10);
        scene.add(axes);

        grid = new THREE.GridHelper(20, 20, 0x667eea, 0x334488);
        grid.rotation.x = Math.PI / 2;
        scene.add(grid);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        window.addEventListener('resize', onWindowResize);

        GeometryApp.labelRenderer = labelRenderer;
        return { scene, camera, renderer, labelRenderer };
    }

    function onWindowResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;

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
        
        // Update point labels to orbit around spheres
        if (GeometryApp.points) {
            updatePointLabels();
        }
        
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
    }

    function updatePointLabels() {
        const camera = GeometryApp.scene.getCamera();
        if (!camera) return;
        
        GeometryApp.state.points.forEach(point => {
            if (point.label && point.mesh) {
                // Get direction from point to camera
                const cameraDirection = new THREE.Vector3();
                cameraDirection.subVectors(camera.position, point.mesh.position);
                cameraDirection.normalize();
                
                // Position label on sphere surface (radius 0.2) plus offset
                const labelDistance = 0.35; // Sphere radius (0.2) + offset (0.15)
                point.label.position.copy(cameraDirection.multiplyScalar(labelDistance));
            }
        });
    }

    return {
        init,
        animate,
        getScene: () => scene,
        getCamera: () => camera,
        getRenderer: () => renderer,
        getAxes: () => axes,
        getGrid: () => grid
    };
})();

// ===== CAMERA CONTROLS =====
GeometryApp.controls = (() => {
    let camera, renderer;
    let isRightMouseDown = false;
    let isMiddleMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    // Initialize to match initial camera position (10, 10, 10)
    let distance = Math.sqrt(10*10 + 10*10 + 10*10); // ~17.32
    let theta = Math.atan2(10, 10); // Math.PI/4
    let phi = Math.acos(10 / distance); // Correct vertical angle
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

        updateCameraPosition()
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

            theta -= deltaX * 0.01;
            phi -= deltaY * 0.01;
            
            phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi));

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            updateCameraPosition();
        } else if (isMiddleMouseDown) {
            const deltaX = e.clientX - lastMouseX;
            const deltaY = e.clientY - lastMouseY;

            const panSpeed = 0.02;
            
            const cameraRight = new THREE.Vector3();
            const cameraUp = new THREE.Vector3(0, 0, 1);
            camera.getWorldDirection(cameraRight);
            cameraRight.cross(cameraUp).normalize();
            
            const up = new THREE.Vector3(0, 0, 1);
            
            target.addScaledVector(cameraRight, -deltaX * panSpeed);
            target.addScaledVector(up, deltaY * panSpeed);

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
        distance += e.deltaY * 0.02;
        distance = Math.max(2, Math.min(100, distance));
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
        const panSpeed = 0.2;
        if (keys.w || keys.a || keys.s || keys.d) {
            const forward = new THREE.Vector3();
            const right = new THREE.Vector3();
            camera.getWorldDirection(forward);
            forward.z = 0;
            forward.normalize();
            
            const up = new THREE.Vector3(0, 0, 1);
            right.crossVectors(forward, up).normalize();

            if (keys.w) target.addScaledVector(forward, panSpeed);
            if (keys.s) target.addScaledVector(forward, -panSpeed);
            if (keys.a) target.addScaledVector(right, -panSpeed);
            if (keys.d) target.addScaledVector(right, panSpeed);

            updateCameraPosition();
        }
    }

    function updateCameraPosition() {
        const x = distance * Math.sin(phi) * Math.cos(theta);
        const y = distance * Math.sin(phi) * Math.sin(theta);
        const z = distance * Math.cos(phi);

        camera.position.set(
            target.x + x,
            target.y + y,
            target.z + z
        );
        camera.lookAt(target);
        camera.up.set(0, 0, 1);
    }
    
    return { init, update };
})();

// ===== POINTS MODULE (LABELS ORBIT AROUND SPHERE) =====
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

        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const intersection = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersection);

        if (intersection) {
            const color = document.getElementById('point-color')?.value || '#6366f1';
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
        div.style.pointerEvents = 'none';
        div.style.userSelect = 'none';
        const label = new CSS2DObject(div);
        label.position.set(0, 0, 0); // Will be updated in animation loop
        return label;
    }

    function addPoint(x, y, z, color = '#6366f1', name = null) {
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
            GeometryApp.ui.updatePlanePointSelector();
        }
    }

    function renamePoint(oldName, newName) {
        if (!/^[a-z0-9-]{1,5}$/i.test(newName)) {
            return { success: false, error: 'modal-invalid-name-message' };
        }

        if (GeometryApp.state.points.some(p => p.name === newName && p.name !== oldName)) {
            return { success: false, error: 'modal-name-exists' };
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
                    'modal-delete-point-title',
                    'modal-delete-point-message',
                    { name: name, planes: planeNames }
                );
                
                if (!confirmed) return;
                
                usedByPlanes.forEach(plane => {
                    GeometryApp.planes.deletePlane(plane.name);
                });
            }
            
            // Remove label from DOM - THIS IS THE NEW CODE
            if (point.label && point.label.element && point.label.element.parentNode) {
                point.label.element.parentNode.removeChild(point.label.element);
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
            // Remove label from DOM - THIS IS THE NEW CODE
            if (p.label && p.label.element && p.label.element.parentNode) {
                p.label.element.parentNode.removeChild(p.label.element);
            }
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

// ===== LINES MODULE =====
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

    function connectPoints(fromName, toName, color = '#10b981', thickness = 0.05) {
        if (connectionExists(fromName, toName)) {
            return { success: false, error: 'error-connection-exists' };
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

// ===== PLANES MODULE =====
GeometryApp.planes = (() => {
    let scene;
    let planeCounter = 1;

    function init(sceneRef) {
        scene = sceneRef;
    }

    function arePointsCollinear(p1, p2, p3) {
        const v1 = new THREE.Vector3(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
        const v2 = new THREE.Vector3(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
        const cross = new THREE.Vector3().crossVectors(v1, v2);
        return cross.length() < 0.0001;
    }
    function arePointsCoplanar(points) {
        if (points.length <= 3) return true;
        
        // Use first 3 points to define the plane
        const p1 = new THREE.Vector3(points[0].x, points[0].y, points[0].z);
        const p2 = new THREE.Vector3(points[1].x, points[1].y, points[1].z);
        const p3 = new THREE.Vector3(points[2].x, points[2].y, points[2].z);
        
        // Calculate plane normal
        const v1 = new THREE.Vector3().subVectors(p2, p1);
        const v2 = new THREE.Vector3().subVectors(p3, p1);
        const normal = new THREE.Vector3().crossVectors(v1, v2).normalize();
        
        // Check if all other points lie on this plane
        for (let i = 3; i < points.length; i++) {
            const p = new THREE.Vector3(points[i].x, points[i].y, points[i].z);
            const toPoint = new THREE.Vector3().subVectors(p, p1);
            const distance = Math.abs(toPoint.dot(normal));
            
            // If distance to plane > threshold, points are not coplanar
            if (distance > 0.0001) {
                return false;
            }
        }
        
        return true;
    }

    function createPlane(pointNames, color = '#f472b6', opacity = 0.4) {
        if (pointNames.length < 3) {
            return { success: false, error: 'error-need-3-points' };
        }

        if (planeExists(pointNames)) {
            return { success: false, error: 'error-plane-exists' };
        }
        const points = GeometryApp.state.points;
        const selectedPoints = pointNames.map(name => 
            points.find(p => p.name === name)
        );

        // Check if any points are invalid (don't exist)
        if (selectedPoints.some(p => !p)) {
            return { success: false, error: 'error-invalid-points' };
        }

        if (arePointsCollinear(selectedPoints[0], selectedPoints[1], selectedPoints[2])) {
            return { success: false, error: 'error-collinear-points' };
        }

        if (!arePointsCoplanar(selectedPoints)) {
            return { success: false, error: 'error-not-coplanar' };
        }

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

        const localX = v1.clone().normalize();
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
            color: color,
            transparent: true,
            opacity: opacity,
            side: THREE.DoubleSide,
            depthWrite: false
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(centroid);
        
        const matrix = new THREE.Matrix4();
        matrix.makeBasis(localX, localY, normal);
        mesh.rotation.setFromRotationMatrix(matrix);

        scene.add(mesh);

        const plane = {
            name: `Plane${planeCounter++}`,
            pointNames: pointNames,
            color,
            opacity,
            mesh,
            visible: true
        };

        GeometryApp.state.planes.push(plane);
        GeometryApp.ui.updatePlanesList();
        GeometryApp.ui.updateStats();

        return { success: true, plane };
    }

    function planeExists(pointNames) {
        const sortedNew = [...pointNames].sort();
        
        return GeometryApp.state.planes.some(plane => {
            const sortedExisting = [...plane.pointNames].sort();
            return sortedNew.length === sortedExisting.length &&
                sortedNew.every((name, i) => name === sortedExisting[i]);
        });
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

            const localX = v1.clone().normalize();
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
            
            const matrix = new THREE.Matrix4();
            matrix.makeBasis(localX, localY, normal);
            mesh.rotation.setFromRotationMatrix(matrix);
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

// ===== SHAPES MODULE =====
GeometryApp.shapes = (() => {
    function createTriangle() {
        const p1 = GeometryApp.points.addPoint(-2, 0, 0, '#6366f1');
        const p2 = GeometryApp.points.addPoint(2, 0, 0, '#6366f1');
        const p3 = GeometryApp.points.addPoint(0, 3, 0, '#6366f1');

        GeometryApp.lines.connectPoints(p1.name, p2.name);
        GeometryApp.lines.connectPoints(p2.name, p3.name);
        GeometryApp.lines.connectPoints(p3.name, p1.name);
    }

    function createTetrahedron() {
        const h = Math.sqrt(2/3) * 2;
        const p1 = GeometryApp.points.addPoint(0, 0, h, '#6366f1');
        const p2 = GeometryApp.points.addPoint(-1, -1/Math.sqrt(3), 0, '#6366f1');
        const p3 = GeometryApp.points.addPoint(1, -1/Math.sqrt(3), 0, '#6366f1');
        const p4 = GeometryApp.points.addPoint(0, 2/Math.sqrt(3), 0, '#6366f1');

        GeometryApp.lines.connectPoints(p1.name, p2.name);
        GeometryApp.lines.connectPoints(p1.name, p3.name);
        GeometryApp.lines.connectPoints(p1.name, p4.name);
        GeometryApp.lines.connectPoints(p2.name, p3.name);
        GeometryApp.lines.connectPoints(p3.name, p4.name);
        GeometryApp.lines.connectPoints(p4.name, p2.name);
    }

    function createCube() {
        const s = 2;
        const p1 = GeometryApp.points.addPoint(-s, -s, -s, '#6366f1');
        const p2 = GeometryApp.points.addPoint(s, -s, -s, '#6366f1');
        const p3 = GeometryApp.points.addPoint(s, s, -s, '#6366f1');
        const p4 = GeometryApp.points.addPoint(-s, s, -s, '#6366f1');
        const p5 = GeometryApp.points.addPoint(-s, -s, s, '#6366f1');
        const p6 = GeometryApp.points.addPoint(s, -s, s, '#6366f1');
        const p7 = GeometryApp.points.addPoint(s, s, s, '#6366f1');
        const p8 = GeometryApp.points.addPoint(-s, s, s, '#6366f1');

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
        const p1 = GeometryApp.points.addPoint(-2, 0, -2, '#6366f1');
        const p2 = GeometryApp.points.addPoint(2, 0, -2, '#6366f1');
        const p3 = GeometryApp.points.addPoint(0, 3, -2, '#6366f1');
        const p4 = GeometryApp.points.addPoint(-2, 0, 2, '#6366f1');
        const p5 = GeometryApp.points.addPoint(2, 0, 2, '#6366f1');
        const p6 = GeometryApp.points.addPoint(0, 3, 2, '#6366f1');

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
        const p1 = GeometryApp.points.addPoint(-s, -s, 0, '#6366f1');
        const p2 = GeometryApp.points.addPoint(s, -s, 0, '#6366f1');
        const p3 = GeometryApp.points.addPoint(s, s, 0, '#6366f1');
        const p4 = GeometryApp.points.addPoint(-s, s, 0, '#6366f1');
        const p5 = GeometryApp.points.addPoint(0, 0, h, '#6366f1');

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

// ===== STORAGE MODULE (MULTILINGUAL) =====
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
                bgColor: document.getElementById('bg-color')?.value || '#0f172a',
                showAxes: document.getElementById('toggle-axes')?.checked || true,
                showGrid: document.getElementById('toggle-grid')?.checked || true,
                showLabels: document.getElementById('toggle-labels')?.checked || true
            }
        };

        try {
            if (window.storage && typeof window.storage.set === 'function') {
                await window.storage.set('geometry-model', JSON.stringify(data));
                await GeometryApp.modal.alert('modal-success-title', 'modal-save-success');
            } else {
                localStorage.setItem('geometry-model', JSON.stringify(data));
                await GeometryApp.modal.alert('modal-success-title', 'modal-save-local');
            }
        } catch (error) {
            console.error('Save failed:', error);
            await GeometryApp.modal.alert('modal-error-title', 'modal-save-error');
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
                await GeometryApp.modal.alert('modal-no-data-title', 'modal-no-data-message');
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

            await GeometryApp.modal.alert('modal-success-title', 'modal-load-success');
        } catch (error) {
            console.error('Load failed:', error);
            await GeometryApp.modal.alert('modal-error-title', 'modal-load-error');
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
                'modal-clear-all-title',
                'modal-clear-all-message'
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

// ===== UI MODULE =====
GeometryApp.ui = (() => {
    let selectedPlanePoints = new Set();

    function init() {
        const addPointBtn = document.getElementById('add-point-btn');
        if (addPointBtn) {
            addPointBtn.addEventListener('click', () => {
                const x = parseFloat(document.getElementById('point-x')?.value || 0);
                const y = parseFloat(document.getElementById('point-y')?.value || 0);
                const z = parseFloat(document.getElementById('point-z')?.value || 0);
                const color = document.getElementById('point-color')?.value || '#6366f1';
                GeometryApp.points.addPoint(x, y, z, color);
            });
        }

        const connectBtn = document.getElementById('connect-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => {
                const from = document.getElementById('point-from')?.value;
                const to = document.getElementById('point-to')?.value;
                const color = document.getElementById('line-color')?.value || '#10b981';
                const thickness = parseFloat(document.getElementById('line-thickness-input')?.value || 0.05);
                
                if (from && to && from !== to) {
                    const result = GeometryApp.lines.connectPoints(from, to, color, thickness);

                    const alert = document.getElementById('line-alert');
                    if (alert) {
                        if (!result.success) {
                            const translatedError = GeometryApp.lang.t(result.error);
                            alert.innerHTML = `<div class="alert alert-warning">${translatedError}</div>`;
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
                const selectedPoints = Array.from(selectedPlanePoints);
                const color = document.getElementById('plane-color')?.value || '#f472b6';
                const opacity = parseFloat(document.getElementById('plane-opacity')?.value || 0.4);
                
                const result = GeometryApp.planes.createPlane(selectedPoints, color, opacity);
                
                const alert = document.getElementById('plane-alert');
                if (alert) {
                    if (!result.success) {
                        const translatedError = GeometryApp.lang.t(result.error);
                        alert.innerHTML = `<div class="alert alert-error">${translatedError}</div>`;
                        setTimeout(() => alert.innerHTML = '', 5000);
                    } else {
                        const successMsg = GeometryApp.lang.t('success-plane-created');
                        alert.innerHTML = `<div class="alert alert-success">${successMsg}</div>`;
                        setTimeout(() => alert.innerHTML = '', 3000);
                        selectedPlanePoints.clear();
                        updatePlanePointSelector();
                    }
                }
            });
        }

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

        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) saveBtn.addEventListener('click', () => GeometryApp.storage.save());

        const loadBtn = document.getElementById('load-btn');
        if (loadBtn) loadBtn.addEventListener('click', () => GeometryApp.storage.load());

        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) exportBtn.addEventListener('click', () => GeometryApp.storage.exportJSON());

        const clearBtn = document.getElementById('clear-btn');
        if (clearBtn) clearBtn.addEventListener('click', () => GeometryApp.storage.clearAll());

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                if (lang) GeometryApp.lang.setLanguage(lang);
            });
        });

        document.querySelectorAll('[data-shape]').forEach(btn => {
            btn.addEventListener('click', () => {
                const shape = btn.dataset.shape;
                if (shape && GeometryApp.shapes[`create${shape.charAt(0).toUpperCase() + shape.slice(1)}`]) {
                    GeometryApp.shapes[`create${shape.charAt(0).toUpperCase() + shape.slice(1)}`]();
                }
            });
        });
        // NEW: Sidebar toggle functionality
        const toggleLeft = document.getElementById('toggle-left');
        const toggleRight = document.getElementById('toggle-right');
        const sidebarLeft = document.querySelector('.sidebar-left');
        const sidebarRight = document.querySelector('.sidebar-right');

        if (toggleLeft && sidebarLeft) {
            toggleLeft.addEventListener('click', () => {
                sidebarLeft.classList.toggle('collapsed');
                toggleLeft.classList.toggle('collapsed');
                const arrow = toggleLeft.querySelector('.toggle-arrow');
                arrow.textContent = sidebarLeft.classList.contains('collapsed') ? '→' : '←';
                setTimeout(() => {
                    if (GeometryApp.scene) {
                        const sceneModule = GeometryApp.scene;
                        const camera = sceneModule.getCamera();
                        const renderer = sceneModule.getRenderer();
                        const container = document.getElementById('canvas-container');
                        
                        if (camera && renderer && container) {
                            const width = container.clientWidth;
                            const height = container.clientHeight;
                            
                            camera.aspect = width / height;
                            camera.updateProjectionMatrix();
                            renderer.setSize(width, height);
                            GeometryApp.labelRenderer.setSize(width, height);
                        }
                    }
                }, 350);
            });
        }

        if (toggleRight && sidebarRight) {
            toggleRight.addEventListener('click', () => {
                sidebarRight.classList.toggle('collapsed');
                toggleRight.classList.toggle('collapsed');
                const arrow = toggleRight.querySelector('.toggle-arrow');
                arrow.textContent = sidebarRight.classList.contains('collapsed') ? '←' : '→';
                setTimeout(() => {
                    if (GeometryApp.scene) {
                        const sceneModule = GeometryApp.scene;
                        const camera = sceneModule.getCamera();
                        const renderer = sceneModule.getRenderer();
                        const container = document.getElementById('canvas-container');
                        
                        if (camera && renderer && container) {
                            const width = container.clientWidth;
                            const height = container.clientHeight;
                            
                            camera.aspect = width / height;
                            camera.updateProjectionMatrix();
                            renderer.setSize(width, height);
                            GeometryApp.labelRenderer.setSize(width, height);
                        }
                    }
                }, 350);
            });
        }
    
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
            await GeometryApp.modal.alert('modal-invalid-name-title', result.error);
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
            const card = document.createElement('div');
            card.className = 'point-card';
            if (selectedPlanePoints.has(point.name)) {
                card.classList.add('selected');
            }
            
            card.innerHTML = `
                <div class="point-card-name">${point.name}</div>
                <div class="point-card-coords">(${point.x.toFixed(1)}, ${point.y.toFixed(1)}, ${point.z.toFixed(1)})</div>
            `;
            
            card.addEventListener('click', () => {
                if (selectedPlanePoints.has(point.name)) {
                    selectedPlanePoints.delete(point.name);
                    card.classList.remove('selected');
                } else {
                    selectedPlanePoints.add(point.name);
                    card.classList.add('selected');
                }
            });
            
            selector.appendChild(card);
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
            <strong>📊 Current Model:</strong><br>
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
    GeometryApp.modal.init();
    
    const { scene, camera, renderer } = GeometryApp.scene.init();
    
    GeometryApp.controls.init(camera, renderer);
    
    GeometryApp.points.init(scene);
    GeometryApp.lines.init(scene);
    GeometryApp.planes.init(scene);
    GeometryApp.ui.init();
    
    GeometryApp.lang.setLanguage('en');
    
    GeometryApp.scene.animate();
    
    GeometryApp.ui.updateStats();
});