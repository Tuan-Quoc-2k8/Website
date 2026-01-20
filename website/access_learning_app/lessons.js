/* ========================================
   Microsoft Access Learning Simulator
   Lesson Content Management System
   ======================================== */

'use strict';

/* ========================================
   LESSON CATEGORIES
   ======================================== */
const LessonCategories = [
    { 
        id: 'intro', 
        icon: '📚', 
        title: { 
            en: 'Introduction to Access', 
            vi: 'Giới Thiệu Access' 
        } 
    },
    { 
        id: 'tables', 
        icon: '📋', 
        title: { 
            en: 'Tables & Design', 
            vi: 'Bảng & Thiết Kế' 
        } 
    },
    { 
        id: 'relationships', 
        icon: '🔗', 
        title: { 
            en: 'Relationships', 
            vi: 'Quan Hệ' 
        } 
    },
    { 
        id: 'queries', 
        icon: '🔍', 
        title: { 
            en: 'Queries & SQL', 
            vi: 'Truy Vấn & SQL' 
        } 
    },
    { 
        id: 'advanced', 
        icon: '⚡', 
        title: { 
            en: 'Advanced Topics', 
            vi: 'Chủ Đề Nâng Cao' 
        } 
    }
];

/* ========================================
   LESSON CONTENT
   ======================================== */
const LessonContent = [
    // ========================================
    // INTRODUCTION CATEGORY
    // ========================================
    {
        id: 'lesson-01',
        category: 'intro',
        title: { 
            en: 'Welcome to Microsoft Access', 
            vi: 'Chào Mừng Đến Microsoft Access' 
        },
        steps: [
            {
                type: 'goal',
                content: { 
                    en: 'Understand what Microsoft Access is and how it helps you manage data efficiently.',
                    vi: 'Hiểu Microsoft Access là gì và nó giúp bạn quản lý dữ liệu hiệu quả như thế nào.'
                }
            },
            {
                type: 'demo',
                content: {
                    en: 'Microsoft Access is a database management system (DBMS) that combines a relational database engine with a graphical user interface. Unlike spreadsheets like Excel, Access is designed specifically for storing, organizing, and querying large amounts of structured data. It\'s perfect for inventory management, customer databases, project tracking, and much more.',
                    vi: 'Microsoft Access là hệ thống quản lý cơ sở dữ liệu (DBMS) kết hợp công cụ cơ sở dữ liệu quan hệ với giao diện đồ họa. Không giống như bảng tính Excel, Access được thiết kế đặc biệt để lưu trữ, tổ chức và truy vấn lượng lớn dữ liệu có cấu trúc. Nó hoàn hảo cho quản lý hàng tồn kho, cơ sở dữ liệu khách hàng, theo dõi dự án và nhiều hơn nữa.'
                }
            },
            {
                type: 'practice',
                content: {
                    en: 'Explore the interface of this simulator. Notice the ribbon menu at the top with tabs for Lessons, Table Design, Relationships, and Query Design. This layout mimics the real Microsoft Access interface.',
                    vi: 'Khám phá giao diện của trình mô phỏng này. Chú ý menu ribbon ở trên cùng với các tab cho Bài Học, Thiết Kế Bảng, Quan Hệ và Thiết Kế Truy Vấn. Bố cục này bắt chước giao diện Microsoft Access thực.'
                }
            },
            {
                type: 'checkpoint',
                content: {
                    en: 'You\'re ready to start learning! Click the next lesson to continue your journey into database management.',
                    vi: 'Bạn đã sẵn sàng để bắt đầu học! Nhấn bài học tiếp theo để tiếp tục hành trình quản lý cơ sở dữ liệu của bạn.'
                }
            }
        ]
    },
    
    {
        id: 'lesson-02',
        category: 'intro',
        title: { 
            en: 'Database Fundamentals', 
            vi: 'Cơ Bản Về Cơ Sở Dữ Liệu' 
        },
        steps: [
            {
                type: 'goal',
                content: {
                    en: 'Learn the fundamental concepts of databases: tables, fields, records, and keys.',
                    vi: 'Học các khái niệm cơ bản về cơ sở dữ liệu: bảng, trường, bản ghi và khóa.'
                }
            },
            {
                type: 'demo',
                content: {
                    en: 'A database organizes information into <strong>tables</strong>. Each table contains <strong>fields</strong> (columns) that define the type of data, and <strong>records</strong> (rows) that contain actual data. For example, a Students table might have fields like StudentID, FirstName, LastName, and Email. Each student would be one record.',
                    vi: 'Cơ sở dữ liệu tổ chức thông tin thành <strong>bảng</strong>. Mỗi bảng chứa các <strong>trường</strong> (cột) xác định loại dữ liệu, và <strong>bản ghi</strong> (hàng) chứa dữ liệu thực tế. Ví dụ, bảng Sinh Viên có thể có các trường như MãSV, Họ, Tên và Email. Mỗi sinh viên sẽ là một bản ghi.'
                }
            },
            {
                type: 'mistakes',
                content: {
                    en: 'Common mistake: Storing all data in one large table. In proper database design, information should be split into multiple related tables to avoid data redundancy and ensure integrity.',
                    vi: 'Lỗi thường gặp: Lưu tất cả dữ liệu trong một bảng lớn. Trong thiết kế cơ sở dữ liệu đúng, thông tin nên được tách thành nhiều bảng có liên quan để tránh trùng lặp dữ liệu và đảm bảo tính toàn vẹn.'
                }
            },
            {
                type: 'checkpoint',
                content: {
                    en: 'You now understand the basic building blocks of databases. Ready to create your first table?',
                    vi: 'Bây giờ bạn đã hiểu các khối xây dựng cơ bản của cơ sở dữ liệu. Sẵn sàng tạo bảng đầu tiên chưa?'
                }
            }
        ]
    },

    // ========================================
    // TABLES CATEGORY
    // ========================================
    {
        id: 'lesson-03',
        category: 'tables',
        title: { 
            en: 'Creating Your First Table', 
            vi: 'Tạo Bảng Đầu Tiên' 
        },
        completionRule: {
            type: 'table-design',
            tableName: 'Students',
            primaryKey: 'StudentID',
            requiredFields: ['StudentID', 'FirstName', 'LastName']
        },
        hints: [
            {
                type: 'conceptual',
                message: 'Think about what information you need to store about students. Every student needs a unique identifier and basic information like their name.'
            },
            {
                type: 'structural',
                message: 'Your table should have: (1) An ID field with AutoNumber as data type, (2) Fields for first and last name using Short Text, (3) The ID field set as primary key by clicking the 🔑 icon.'
            },
            {
                type: 'direct',
                message: 'Create these exact fields: StudentID (AutoNumber, Primary Key), FirstName (Short Text), LastName (Short Text). Then click Save.'
            }
        ],
        guidedSteps: [
            {
                target: '#currentTableName',
                instruction: 'First, enter "Students" as your table name here.'
            },
            {
                target: '.field-name-input:first-child',
                instruction: 'Click in the first Field Name cell and type "StudentID".'
            },
            {
                target: '.data-type-select:first-child',
                instruction: 'Select "AutoNumber" as the data type for StudentID.'
            },
            {
                target: '.primary-key-btn:first-child',
                instruction: 'Click the key icon (🔑) to set StudentID as the primary key.'
            },
            {
                target: '#saveTableBtn',
                instruction: 'Finally, click Save to create your table!'
            }
        ],
        steps: [
            {
                type: 'goal',
                content: {
                    en: 'Learn to create a table with fields and set a primary key using the Table Design View.',
                    vi: 'Học cách tạo bảng với các trường và đặt khóa chính bằng Table Design View.'
                }
            },
            {
                type: 'demo',
                content: {
                    en: 'In Access, tables are created in Design View where you define the structure. Each field has a name, data type, and optional description. The primary key (🔑) uniquely identifies each record - no two records can have the same primary key value.',
                    vi: 'Trong Access, bảng được tạo trong Design View nơi bạn định nghĩa cấu trúc. Mỗi trường có tên, kiểu dữ liệu và mô tả tùy chọn. Khóa chính (🔑) xác định duy nhất mỗi bản ghi - không có hai bản ghi nào có cùng giá trị khóa chính.'
                }
            },
            {
                type: 'practice',
                content: {
                    en: 'Switch to the <strong>Table Design</strong> tab. Create a table called "Students" with these fields: StudentID (AutoNumber, Primary Key), FirstName (Short Text), LastName (Short Text), and Email (Short Text). Click the 🔑 icon to set StudentID as the primary key. Then click Save.',
                    vi: 'Chuyển sang tab <strong>Thiết Kế Bảng</strong>. Tạo bảng tên "Students" với các trường: StudentID (AutoNumber, Khóa Chính), FirstName (Short Text), LastName (Short Text) và Email (Short Text). Nhấn biểu tượng 🔑 để đặt StudentID làm khóa chính. Sau đó nhấn Lưu.',
                },
                tabRequired: 'table-design'
            },
            {
                type: 'mistakes',
                content: {
                    en: 'Common mistakes: (1) Forgetting to set a primary key - every table needs one! (2) Using Long Text as a primary key - use AutoNumber or Short Text instead. (3) Not giving fields descriptive names.',
                    vi: 'Lỗi thường gặp: (1) Quên đặt khóa chính - mỗi bảng cần một! (2) Sử dụng Long Text làm khóa chính - hãy dùng AutoNumber hoặc Short Text. (3) Không đặt tên mô tả cho các trường.'
                }
            },
            {
                type: 'checkpoint',
                content: {
                    en: 'Complete the practice task above to finish this lesson. Make sure you have at least 3 fields and a primary key set!',
                    vi: 'Hoàn thành bài thực hành ở trên để kết thúc bài học này. Đảm bảo bạn có ít nhất 3 trường và đã đặt khóa chính!'
                }
            }
        ]
    },

    {
        id: 'lesson-04',
        category: 'tables',
        title: { 
            en: 'Understanding Data Types', 
            vi: 'Hiểu Về Kiểu Dữ Liệu' 
        },
        steps: [
            {
                type: 'goal',
                content: {
                    en: 'Master the different data types in Access and when to use each one.',
                    vi: 'Thành thạo các kiểu dữ liệu khác nhau trong Access và khi nào sử dụng từng loại.'
                }
            },
            {
                type: 'demo',
                content: {
                    en: '<strong>Data Types in Access:</strong><br>• <strong>Short Text</strong>: Up to 255 characters (names, addresses, codes)<br>• <strong>Long Text</strong>: Large text (notes, descriptions)<br>• <strong>Number</strong>: Numeric calculations (age, quantity, prices without currency symbol)<br>• <strong>Date/Time</strong>: Dates and times<br>• <strong>Currency</strong>: Money values (automatically formats with currency symbol)<br>• <strong>AutoNumber</strong>: Auto-incrementing unique numbers (perfect for IDs)<br>• <strong>Yes/No</strong>: Boolean true/false values<br>• <strong>Hyperlink</strong>: Web URLs or file paths',
                    vi: '<strong>Các Kiểu Dữ Liệu trong Access:</strong><br>• <strong>Short Text</strong>: Tối đa 255 ký tự (tên, địa chỉ, mã)<br>• <strong>Long Text</strong>: Văn bản lớn (ghi chú, mô tả)<br>• <strong>Number</strong>: Tính toán số (tuổi, số lượng, giá không có ký hiệu tiền tệ)<br>• <strong>Date/Time</strong>: Ngày và giờ<br>• <strong>Currency</strong>: Giá trị tiền tệ (tự động định dạng với ký hiệu tiền tệ)<br>• <strong>AutoNumber</strong>: Số tự động tăng duy nhất (hoàn hảo cho ID)<br>• <strong>Yes/No</strong>: Giá trị Boolean đúng/sai<br>• <strong>Hyperlink</strong>: URL web hoặc đường dẫn tệp'
                }
            },
            {
                type: 'mistakes',
                content: {
                    en: 'Critical mistake: Using Number for phone numbers or ZIP codes! This removes leading zeros (e.g., "0123" becomes "123"). Always use Short Text for codes, even if they look like numbers.',
                    vi: 'Lỗi nghiêm trọng: Sử dụng Number cho số điện thoại hoặc mã ZIP! Điều này loại bỏ số 0 đứng đầu (ví dụ: "0123" trở thành "123"). Luôn sử dụng Short Text cho mã, ngay cả khi chúng trông giống số.'
                }
            },
            {
                type: 'checkpoint',
                content: {
                    en: 'Can you identify the correct data type for: (1) A product price? (2) A phone number? (3) An employee\'s hire date? (Answers: Currency, Short Text, Date/Time)',
                    vi: 'Bạn có thể xác định kiểu dữ liệu đúng cho: (1) Giá sản phẩm? (2) Số điện thoại? (3) Ngày tuyển dụng nhân viên? (Đáp án: Currency, Short Text, Date/Time)'
                }
            }
        ]
    },

    {
        id: 'lesson-05',
        category: 'tables',
        title: { 
            en: 'Field Properties Deep Dive', 
            vi: 'Tìm Hiểu Sâu Về Thuộc Tính Trường' 
        },
        steps: [
            {
                type: 'goal',
                content: {
                    en: 'Learn to use field properties to control data entry and ensure data quality.',
                    vi: 'Học cách sử dụng thuộc tính trường để kiểm soát nhập dữ liệu và đảm bảo chất lượng dữ liệu.'
                }
            },
            {
                type: 'demo',
                content: {
                    en: '<strong>Important Field Properties:</strong><br>• <strong>Field Size</strong>: Maximum length for text fields (saves space)<br>• <strong>Required</strong>: Forces user to enter a value (Yes/No)<br>• <strong>Default Value</strong>: Pre-filled value for new records<br>• <strong>Validation Rule</strong>: Formula to check if data is valid (e.g., >0 for positive numbers)<br>• <strong>Validation Text</strong>: Error message shown when validation fails',
                    vi: '<strong>Thuộc Tính Trường Quan Trọng:</strong><br>• <strong>Kích Thước Trường</strong>: Độ dài tối đa cho trường văn bản (tiết kiệm không gian)<br>• <strong>Bắt Buộc</strong>: Bắt người dùng nhập giá trị (Có/Không)<br>• <strong>Giá Trị Mặc Định</strong>: Giá trị được điền sẵn cho bản ghi mới<br>• <strong>Quy Tắc Xác Thực</strong>: Công thức kiểm tra dữ liệu hợp lệ (ví dụ: >0 cho số dương)<br>• <strong>Văn Bản Xác Thực</strong>: Thông báo lỗi hiển thị khi xác thực thất bại'
                }
            },
            {
                type: 'practice',
                content: {
                    en: 'In Table Design view, select a field and look at the Field Properties panel below. Try setting Required to "Yes" and entering a Default Value. These properties help maintain data integrity!',
                    vi: 'Trong chế độ Thiết Kế Bảng, chọn một trường và xem bảng Thuộc Tính Trường bên dưới. Thử đặt Bắt Buộc thành "Yes" và nhập Giá Trị Mặc Định. Các thuộc tính này giúp duy trì tính toàn vẹn dữ liệu!'
                },
                tabRequired: 'table-design'
            },
            {
                type: 'checkpoint',
                content: {
                    en: 'Field properties are powerful tools for data validation. They prevent bad data from entering your database!',
                    vi: 'Thuộc tính trường là công cụ mạnh mẽ để xác thực dữ liệu. Chúng ngăn dữ liệu xấu vào cơ sở dữ liệu của bạn!'
                }
            }
        ]
    },

    // ========================================
    // RELATIONSHIPS CATEGORY
    // ========================================
    {
        id: 'lesson-06',
        category: 'relationships',
        title: { 
            en: 'Introduction to Relationships', 
            vi: 'Giới Thiệu Về Quan Hệ' 
        },
        steps: [
            {
                type: 'goal',
                content: {
                    en: 'Understand why and how tables are connected through relationships.',
                    vi: 'Hiểu tại sao và làm thế nào các bảng được kết nối thông qua quan hệ.'
                }
            },
            {
                type: 'demo',
                content: {
                    en: 'Relationships connect tables using common fields. This allows you to store data efficiently without duplication. For example, instead of storing student information in every enrollment record, you store it once in a Students table and link to it using StudentID.',
                    vi: 'Quan hệ kết nối các bảng bằng cách sử dụng các trường chung. Điều này cho phép bạn lưu trữ dữ liệu hiệu quả mà không trùng lặp. Ví dụ, thay vì lưu thông tin sinh viên trong mỗi bản ghi đăng ký, bạn lưu nó một lần trong bảng Students và liên kết đến nó bằng StudentID.'
                }
            },
            {
                type: 'mistakes',
                content: {
                    en: 'Major design flaw: Creating separate tables without relationships. This leads to data inconsistency and makes querying across tables impossible!',
                    vi: 'Lỗi thiết kế lớn: Tạo các bảng riêng biệt không có quan hệ. Điều này dẫn đến dữ liệu không nhất quán và làm cho truy vấn qua các bảng trở nên không thể!'
                }
            },
            {
                type: 'checkpoint',
                content: {
                    en: 'Relationships are the "relational" in relational databases. They\'re essential for proper database design!',
                    vi: 'Quan hệ là "quan hệ" trong cơ sở dữ liệu quan hệ. Chúng rất cần thiết cho thiết kế cơ sở dữ liệu đúng!'
                }
            }
        ]
    },

    {
        id: 'lesson-07',
        category: 'relationships',
        title: { 
            en: 'Creating Relationships', 
            vi: 'Tạo Quan Hệ' 
        },
        completionRule: {
            type: 'relationship',
            sourceTable: 'Students',
            targetTable: 'Enrollments',
            sourceField: 'StudentID',
            targetField: 'StudentID'
        },
        hints: [
            {
                type: 'conceptual',
                message: 'Relationships connect tables through common fields. One student can have many enrollments, so we need a one-to-many relationship from Students to Enrollments.'
            },
            {
                type: 'structural',
                message: 'Add both Students and Enrollments tables to the canvas. Then drag from the StudentID field in Students (which is the primary key) to StudentID in Enrollments.'
            },
            {
                type: 'direct',
                message: 'Click "Add Table", select both Students and Enrollments. Drag the StudentID field from Students table to StudentID field in Enrollments table. Check "Enforce Referential Integrity" and click Create.'
            }
        ],
        steps: [
            {
                type: 'goal',
                content: {
                    en: 'Learn to create one-to-many relationships between tables with referential integrity.',
                    vi: 'Học cách tạo quan hệ một-nhiều giữa các bảng với tính toàn vẹn tham chiếu.'
                }
            },
            {
                type: 'demo',
                content: {
                    en: 'To create a relationship: (1) Drag a field from one table to a field in another table, (2) The source field should be a Primary Key, (3) The target field is called a Foreign Key, (4) Enable "Enforce Referential Integrity" to prevent orphaned records.',
                    vi: 'Để tạo quan hệ: (1) Kéo trường từ bảng này sang trường trong bảng khác, (2) Trường nguồn phải là Khóa Chính, (3) Trường đích được gọi là Khóa Ngoại, (4) Bật "Ép Buộc Toàn Vẹn Tham Chiếu" để ngăn chặn bản ghi mồ côi.'
                }
            },
            {
                type: 'practice',
                content: {
                    en: 'Go to the <strong>Relationships</strong> tab. Click "Add Table" to add Students and Enrollments tables to the canvas. Drag StudentID from Students to StudentID in Enrollments. Check "Enforce Referential Integrity" and click Create.',
                    vi: 'Đi đến tab <strong>Quan Hệ</strong>. Nhấn "Thêm Bảng" để thêm bảng Students và Enrollments vào canvas. Kéo StudentID từ Students đến StudentID trong Enrollments. Đánh dấu "Ép Buộc Toàn Vẹn Tham Chiếu" và nhấn Tạo.',
                },
                tabRequired: 'relationships'
            },
            {
                type: 'checkpoint',
                content: {
                    en: 'You\'ve created your first relationship! The "1" and "∞" symbols show this is a one-to-many relationship.',
                    vi: 'Bạn đã tạo quan hệ đầu tiên! Các ký hiệu "1" và "∞" cho thấy đây là quan hệ một-nhiều.'
                }
            }
        ]
    },

    // ========================================
    // QUERIES CATEGORY
    // ========================================
    {
        id: 'lesson-08',
        category: 'queries',
        title: { 
            en: 'Introduction to Queries', 
            vi: 'Giới Thiệu Về Truy Vấn' 
        },
        steps: [
            {
                type: 'goal',
                content: {
                    en: 'Understand what queries do and why they\'re essential for working with databases.',
                    vi: 'Hiểu truy vấn làm gì và tại sao chúng thiết yếu cho làm việc với cơ sở dữ liệu.'
                }
            },
            {
                type: 'demo',
                content: {
                    en: 'Queries let you ask questions about your data and get answers. You can: (1) View specific fields, (2) Filter records based on criteria, (3) Sort results, (4) Combine data from multiple tables, (5) Perform calculations. Queries don\'t change your data - they just display it in different ways.',
                    vi: 'Truy vấn cho phép bạn đặt câu hỏi về dữ liệu và nhận câu trả lời. Bạn có thể: (1) Xem các trường cụ thể, (2) Lọc bản ghi dựa trên tiêu chí, (3) Sắp xếp kết quả, (4) Kết hợp dữ liệu từ nhiều bảng, (5) Thực hiện tính toán. Truy vấn không thay đổi dữ liệu - chỉ hiển thị nó theo các cách khác nhau.'
                }
            },
            {
                type: 'checkpoint',
                content: {
                    en: 'Queries are like asking your database smart questions. Next, you\'ll learn to build them!',
                    vi: 'Truy vấn giống như đặt câu hỏi thông minh cho cơ sở dữ liệu. Tiếp theo, bạn sẽ học cách xây dựng chúng!'
                }
            }
        ]
    },

    {
        id: 'lesson-09',
        category: 'queries',
        title: { 
            en: 'Building Your First Query', 
            vi: 'Xây Dựng Truy Vấn Đầu Tiên' 
        },
        completionRule: {
            type: 'query',
            requiredTables: ['Students'],
            requiredFields: ['FirstName', 'LastName', 'Email']
        },
        hints: [
            {
                type: 'conceptual',
                message: 'Queries let you view specific information from your tables. Think about which fields you want to see in your results.'
            },
            {
                type: 'structural',
                message: 'You need to: (1) Add the Students table to the query, (2) Select the FirstName, LastName, and Email fields, (3) Run the query to see results.'
            },
            {
                type: 'direct',
                message: 'Click "Add Table" and select Students. Then click on FirstName, LastName, and Email in the table box. Finally, click "Run" to execute your query.'
            }
        ],
        steps: [
            {
                type: 'goal',
                content: {
                    en: 'Create a simple query using Query Design View to select specific fields from a table.',
                    vi: 'Tạo truy vấn đơn giản bằng Query Design View để chọn các trường cụ thể từ bảng.'
                }
            },
            {
                type: 'demo',
                content: {
                    en: 'Query Design View has two parts: (1) Top section shows tables with available fields, (2) Bottom grid shows which fields you\'re selecting, how they\'re sorted, and any criteria. Click a field in the top section to add it to the grid below.',
                    vi: 'Query Design View có hai phần: (1) Phần trên hiển thị các bảng với các trường có sẵn, (2) Lưới dưới hiển thị các trường bạn đang chọn, cách chúng được sắp xếp và tiêu chí nào. Nhấn trường ở phần trên để thêm vào lưới bên dưới.'
                }
            },
            {
                type: 'practice',
                content: {
                    en: 'Switch to <strong>Query Design</strong> tab. Click "Add Table" and select Students. Click on FirstName, LastName, and Email fields to add them to the query grid. Then click "Run" to see the results!',
                    vi: 'Chuyển sang tab <strong>Thiết Kế Truy Vấn</strong>. Nhấn "Thêm Bảng" và chọn Students. Nhấn vào các trường FirstName, LastName và Email để thêm chúng vào lưới truy vấn. Sau đó nhấn "Chạy" để xem kết quả!',
                },
                tabRequired: 'query-design'
            },
            {
                type: 'checkpoint',
                content: {
                    en: 'Congratulations! You\'ve run your first query. The results show only the fields you selected.',
                    vi: 'Chúc mừng! Bạn đã chạy truy vấn đầu tiên. Kết quả chỉ hiển thị các trường bạn đã chọn.'
                }
            }
        ]
    },

    {
        id: 'lesson-10',
        category: 'queries',
        title: { 
            en: 'Understanding SQL View', 
            vi: 'Hiểu SQL View' 
        },
        steps: [
            {
                type: 'goal',
                content: {
                    en: 'Learn how Query Design View translates to SQL code and understand basic SQL syntax.',
                    vi: 'Học cách Query Design View dịch sang mã SQL và hiểu cú pháp SQL cơ bản.'
                }
            },
            {
                type: 'demo',
                content: {
                    en: 'SQL (Structured Query Language) is the language Access uses behind the scenes. When you design a query visually, Access writes SQL code for you. Click "View SQL" to see it! A basic query looks like: SELECT FirstName, LastName FROM Students; This means "show me FirstName and LastName from the Students table".',
                    vi: 'SQL (Ngôn Ngữ Truy Vấn Có Cấu Trúc) là ngôn ngữ Access sử dụng đằng sau. Khi bạn thiết kế truy vấn trực quan, Access viết mã SQL cho bạn. Nhấn "Xem SQL" để xem nó! Truy vấn cơ bản trông như: SELECT FirstName, LastName FROM Students; Điều này có nghĩa là "hiển thị cho tôi FirstName và LastName từ bảng Students".'
                }
            },
            {
                type: 'practice',
                content: {
                    en: 'In Query Design, click "View SQL" to switch to SQL View. You\'ll see the actual SQL code. Switch back to Design View and notice how changes in design update the SQL automatically.',
                    vi: 'Trong Query Design, nhấn "Xem SQL" để chuyển sang SQL View. Bạn sẽ thấy mã SQL thực tế. Chuyển lại Design View và chú ý cách thay đổi trong thiết kế cập nhật SQL tự động.',
                },
                tabRequired: 'query-design'
            },
            {
                type: 'checkpoint',
                content: {
                    en: 'Understanding SQL gives you more power and flexibility. As you learn more, you can write custom SQL directly!',
                    vi: 'Hiểu SQL mang lại cho bạn nhiều quyền lực và linh hoạt hơn. Khi bạn học thêm, bạn có thể viết SQL tùy chỉnh trực tiếp!'
                }
            }
        ]
    },

    // ========================================
    // ADVANCED CATEGORY
    // ========================================
    {
        id: 'lesson-11',
        category: 'advanced',
        title: { 
            en: 'Query Criteria and Filtering', 
            vi: 'Tiêu Chí Truy Vấn và Lọc' 
        },
        steps: [
            {
                type: 'goal',
                content: {
                    en: 'Master using criteria to filter query results and find exactly what you need.',
                    vi: 'Thành thạo sử dụng tiêu chí để lọc kết quả truy vấn và tìm chính xác những gì bạn cần.'
                }
            },
            {
                type: 'demo',
                content: {
                    en: 'Criteria let you filter records. Examples:<br>• <strong>"Smith"</strong> - exact match<br>• <strong>&gt;100</strong> - greater than 100<br>• <strong>Between 50 And 100</strong> - range<br>• <strong>Like "J*"</strong> - starts with J<br>• <strong>Is Null</strong> - empty field<br>Use the "Or" row for additional conditions.',
                    vi: 'Tiêu chí cho phép bạn lọc bản ghi. Ví dụ:<br>• <strong>"Smith"</strong> - khớp chính xác<br>• <strong>&gt;100</strong> - lớn hơn 100<br>• <strong>Between 50 And 100</strong> - phạm vi<br>• <strong>Like "J*"</strong> - bắt đầu với J<br>• <strong>Is Null</strong> - trường trống<br>Sử dụng hàng "Or" cho điều kiện bổ sung.'
                }
            },
            {
                type: 'practice',
                content: {
                    en: 'In Query Design, add a criteria to filter results. For example, in the LastName criteria row, type "Smith" to show only students with that last name.',
                    vi: 'Trong Query Design, thêm tiêu chí để lọc kết quả. Ví dụ, trong hàng tiêu chí LastName, gõ "Smith" để chỉ hiển thị sinh viên có họ đó.',
                },
                tabRequired: 'query-design'
            },
            {
                type: 'checkpoint',
                content: {
                    en: 'Criteria are incredibly powerful. Master them to find exactly the data you need!',
                    vi: 'Tiêu chí cực kỳ mạnh mẽ. Thành thạo chúng để tìm chính xác dữ liệu bạn cần!'
                }
            }
        ]
    },

    {
        id: 'lesson-12',
        category: 'advanced',
        title: { 
            en: 'Multi-Table Queries', 
            vi: 'Truy Vấn Nhiều Bảng' 
        },
        steps: [
            {
                type: 'goal',
                content: {
                    en: 'Learn to combine data from multiple related tables in a single query.',
                    vi: 'Học cách kết hợp dữ liệu từ nhiều bảng liên quan trong một truy vấn.'
                }
            },
            {
                type: 'demo',
                content: {
                    en: 'The real power of relational databases comes from combining tables. When you add multiple tables to a query, Access uses the relationships you created to join them automatically. This lets you display student names alongside their enrollment information, for example.',
                    vi: 'Sức mạnh thực sự của cơ sở dữ liệu quan hệ đến từ việc kết hợp các bảng. Khi bạn thêm nhiều bảng vào truy vấn, Access sử dụng các quan hệ bạn đã tạo để tự động nối chúng. Điều này cho phép bạn hiển thị tên sinh viên cùng với thông tin đăng ký của họ, chẳng hạn.'
                }
            },
            {
                type: 'practice',
                content: {
                    en: 'Add both Students and Enrollments tables to your query. Select fields from both tables. Access will automatically join them using the StudentID relationship.',
                    vi: 'Thêm cả bảng Students và Enrollments vào truy vấn của bạn. Chọn các trường từ cả hai bảng. Access sẽ tự động nối chúng bằng cách sử dụng quan hệ StudentID.',
                },
                tabRequired: 'query-design'
            },
            {
                type: 'checkpoint',
                content: {
                    en: 'Multi-table queries unlock the full potential of your database design!',
                    vi: 'Truy vấn nhiều bảng mở khóa toàn bộ tiềm năng của thiết kế cơ sở dữ liệu của bạn!'
                }
            }
        ]
    }
];

/* ========================================
   EXPORT FOR USE IN MAIN APP
   ======================================== */
// These will be available globally when this file is loaded
if (typeof window !== 'undefined') {
    window.LessonCategories = LessonCategories;
    window.LessonContent = LessonContent;
}