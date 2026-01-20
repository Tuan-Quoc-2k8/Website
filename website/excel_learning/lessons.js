// ==================== LEVEL CONFIGURATION ====================

const LevelConfig = {
  levels: [
    { key: 'beginner', order: 1, minXP: 0 },
    { key: 'intermediate', order: 2, minXP: 500 },
    { key: 'advanced', order: 3, minXP: 1000 },
    { key: 'professional', order: 4, minXP: 2000 },
    { key: 'expert', order: 5, minXP: 3500 },
    { key: 'master', order: 6, minXP: 5000 }
  ],
  
  getLevelByXP(xp) {
    const sorted = [...this.levels].sort((a, b) => b.minXP - a.minXP);
    return sorted.find(level => xp >= level.minXP)?.key || 'beginner';
  },
  
  getAllKeys() {
    return this.levels.map(l => l.key);
  }
};

// ==================== LESSON DATA ====================

const LessonData = {
  lessons: {
    beginner: [
      {
        id: 'b1',
        title: { en: 'Basic Arithmetic', vi: 'Tính toán cơ bản' },
        description: { en: 'Learn basic math operations', vi: 'Học các phép tính cơ bản' },
        category: 'basics',
        difficulty: 'easy',
        estimatedTime: 8,
        prerequisites: [],
        content: {
          en: '<h3>Excel Basics</h3><p>Cells are identified by column letter and row number (A1, B2, etc.)</p><p><strong>Formulas always start with =</strong></p><ul><li>=A1+B1 (addition)</li><li>=A1*B1 (multiplication)</li><li>=A1-B1 (subtraction)</li><li>=A1/B1 (division)</li></ul>',
          vi: '<h3>Excel Cơ bản</h3><p>Ô được xác định bởi chữ cột và số hàng (A1, B2, v.v.)</p><p><strong>Công thức luôn bắt đầu bằng =</strong></p><ul><li>=A1+B1 (cộng)</li><li>=A1*B1 (nhân)</li><li>=A1-B1 (trừ)</li><li>=A1/B1 (chia)</li></ul>'
        },
        exercises: [{
          description: { en: 'Calculate total (quantity × price)', vi: 'Tính tổng (số lượng × giá)' },
          initialData: [
            {r:0,c:0,v:{v:'Product'}},{r:0,c:1,v:{v:'Qty'}},{r:0,c:2,v:{v:'Price'}},{r:0,c:3,v:{v:'Total'}},
            {r:1,c:0,v:{v:'Apples'}},{r:1,c:1,v:{v:5}},{r:1,c:2,v:{v:2}},
            {r:2,c:0,v:{v:'Oranges'}},{r:2,c:1,v:{v:3}},{r:2,c:2,v:{v:3}}
          ],
          tasks: [
            {
              cell: 'D2',
              requiredFormula: '=B2*C2',
              acceptableFormulas: ['=C2*B2'],
              description: { en: 'Calculate total for Apples', vi: 'Tính tổng cho Táo' },
              hint: { en: 'Multiply quantity (B2) × price (C2)', vi: 'Nhân số lượng (B2) × giá (C2)' },
              explanation: { en: '=B2*C2 multiplies quantity by price', vi: '=B2*C2 nhân số lượng với giá' }
            },
            {
              cell: 'D3',
              requiredFormula: '=B3*C3',
              acceptableFormulas: ['=C3*B3'],
              description: { en: 'Calculate total for Oranges', vi: 'Tính tổng cho Cam' },
              hint: { en: 'Same formula for row 3', vi: 'Công thức tương tự cho hàng 3' },
              explanation: { en: '=B3*C3 for Oranges', vi: '=B3*C3 cho Cam' }
            }
          ]
        }]
      },
      {
        id: 'b2',
        title: { en: 'SUM Function', vi: 'Hàm SUM' },
        description: { en: 'Add numbers quickly', vi: 'Cộng số nhanh chóng' },
        category: 'basics',
        difficulty: 'easy',
        estimatedTime: 10,
        prerequisites: ['b1'],
        content: {
          en: '<h3>SUM Function</h3><p>The SUM function adds multiple cells together.</p><p><strong>Syntax:</strong> =SUM(range)</p><p>Example: =SUM(A1:A5) adds cells A1 through A5</p>',
          vi: '<h3>Hàm SUM</h3><p>Hàm SUM cộng nhiều ô lại với nhau.</p><p><strong>Cú pháp:</strong> =SUM(phạm_vi)</p><p>Ví dụ: =SUM(A1:A5) cộng các ô từ A1 đến A5</p>'
        },
        exercises: [{
          description: { en: 'Calculate total sales', vi: 'Tính tổng doanh số' },
          initialData: [
            {r:0,c:0,v:{v:'Month'}},{r:0,c:1,v:{v:'Sales'}},
            {r:1,c:0,v:{v:'Jan'}},{r:1,c:1,v:{v:1200}},
            {r:2,c:0,v:{v:'Feb'}},{r:2,c:1,v:{v:1500}},
            {r:3,c:0,v:{v:'Mar'}},{r:3,c:1,v:{v:1800}},
            {r:4,c:0,v:{v:'Apr'}},{r:4,c:1,v:{v:1400}},
            {r:5,c:0,v:{v:'Total'}}
          ],
          tasks: [{
            cell: 'B6',
            requiredFormula: '=SUM(B2:B5)',
            acceptableFormulas: [],
            description: { en: 'Sum all monthly sales', vi: 'Cộng tất cả doanh số tháng' },
            hint: { en: 'Use SUM function for B2 to B5', vi: 'Dùng hàm SUM cho B2 đến B5' },
            explanation: { en: '=SUM(B2:B5) adds all monthly sales', vi: '=SUM(B2:B5) cộng tất cả doanh số tháng' }
          }]
        }]
      },
      {
        id: 'b3',
        title: { en: 'COUNT & AVERAGE', vi: 'COUNT & AVERAGE' },
        description: { en: 'Count and average numbers', vi: 'Đếm và tính trung bình' },
        category: 'basics',
        difficulty: 'easy',
        estimatedTime: 12,
        prerequisites: ['b2'],
        content: {
          en: '<h3>COUNT & AVERAGE</h3><p>COUNT counts cells with numbers.</p><p>AVERAGE calculates the average.</p><p>=COUNT(A1:A10) counts numeric cells</p><p>=AVERAGE(A1:A10) calculates mean</p>',
          vi: '<h3>COUNT & AVERAGE</h3><p>COUNT đếm các ô chứa số.</p><p>AVERAGE tính trung bình.</p><p>=COUNT(A1:A10) đếm các ô có số</p><p>=AVERAGE(A1:A10) tính trung bình</p>'
        },
        exercises: [{
          description: { en: 'Count and average scores', vi: 'Đếm và tính TB điểm' },
          initialData: [
            {r:0,c:0,v:{v:'Student'}},{r:0,c:1,v:{v:'Score'}},
            {r:1,c:0,v:{v:'Alice'}},{r:1,c:1,v:{v:85}},
            {r:2,c:0,v:{v:'Bob'}},{r:2,c:1,v:{v:92}},
            {r:3,c:0,v:{v:'Charlie'}},{r:3,c:1,v:{v:78}},
            {r:4,c:0,v:{v:'Diana'}},{r:4,c:1,v:{v:88}},
            {r:6,c:0,v:{v:'Count:'}},
            {r:7,c:0,v:{v:'Average:'}}
          ],
          tasks: [
            {
              cell: 'B7',
              requiredFormula: '=COUNT(B2:B5)',
              acceptableFormulas: [],
              description: { en: 'Count total students', vi: 'Đếm tổng số sinh viên' },
              hint: { en: 'Use COUNT to count scores in B2:B5', vi: 'Dùng COUNT để đếm điểm trong B2:B5' },
              explanation: { en: '=COUNT(B2:B5) counts numeric values', vi: '=COUNT(B2:B5) đếm các giá trị số' }
            },
            {
              cell: 'B8',
              requiredFormula: '=AVERAGE(B2:B5)',
              acceptableFormulas: [],
              description: { en: 'Calculate average score', vi: 'Tính điểm trung bình' },
              hint: { en: 'Use AVERAGE for B2:B5', vi: 'Dùng AVERAGE cho B2:B5' },
              explanation: { en: '=AVERAGE(B2:B5) calculates mean score', vi: '=AVERAGE(B2:B5) tính điểm trung bình' }
            }
          ]
        }]
      },
      {
        id: 'b4',
        title: { en: 'MIN & MAX Functions', vi: 'Hàm MIN & MAX' },
        description: { en: 'Find minimum and maximum values', vi: 'Tìm giá trị nhỏ nhất và lớn nhất' },
        category: 'basics',
        difficulty: 'easy',
        estimatedTime: 10,
        prerequisites: ['b3'],
        content: {
          en: '<h3>MIN & MAX</h3><p>=MIN(range) finds the smallest value</p><p>=MAX(range) finds the largest value</p><p>Example: =MIN(A1:A10) returns the minimum</p>',
          vi: '<h3>MIN & MAX</h3><p>=MIN(phạm_vi) tìm giá trị nhỏ nhất</p><p>=MAX(phạm_vi) tìm giá trị lớn nhất</p><p>Ví dụ: =MIN(A1:A10) trả về giá trị nhỏ nhất</p>'
        },
        exercises: [{
          description: { en: 'Find highest and lowest prices', vi: 'Tìm giá cao nhất và thấp nhất' },
          initialData: [
            {r:0,c:0,v:{v:'Product'}},{r:0,c:1,v:{v:'Price'}},
            {r:1,c:0,v:{v:'Laptop'}},{r:1,c:1,v:{v:899}},
            {r:2,c:0,v:{v:'Mouse'}},{r:2,c:1,v:{v:25}},
            {r:3,c:0,v:{v:'Keyboard'}},{r:3,c:1,v:{v:75}},
            {r:4,c:0,v:{v:'Monitor'}},{r:4,c:1,v:{v:249}},
            {r:6,c:0,v:{v:'Highest:'}},
            {r:7,c:0,v:{v:'Lowest:'}}
          ],
          tasks: [
            {
              cell: 'B7',
              requiredFormula: '=MAX(B2:B5)',
              acceptableFormulas: [],
              description: { en: 'Find highest price', vi: 'Tìm giá cao nhất' },
              hint: { en: 'Use MAX to find highest price', vi: 'Dùng MAX để tìm giá cao nhất' },
              explanation: { en: '=MAX(B2:B5) returns highest value', vi: '=MAX(B2:B5) trả về giá trị lớn nhất' }
            },
            {
              cell: 'B8',
              requiredFormula: '=MIN(B2:B5)',
              acceptableFormulas: [],
              description: { en: 'Find lowest price', vi: 'Tìm giá thấp nhất' },
              hint: { en: 'Use MIN to find lowest price', vi: 'Dùng MIN để tìm giá thấp nhất' },
              explanation: { en: '=MIN(B2:B5) returns lowest value', vi: '=MIN(B2:B5) trả về giá trị nhỏ nhất' }
            }
          ]
        }]
      }
    ],
    intermediate: [
      {
        id: 'i1',
        title: { en: 'IF Function', vi: 'Hàm IF' },
        description: { en: 'Conditional logic', vi: 'Logic điều kiện' },
        category: 'logic',
        difficulty: 'medium',
        estimatedTime: 15,
        prerequisites: ['b1','b2'],
        content: {
          en: '<h3>IF Function</h3><p>IF tests a condition and returns different values.</p><p><strong>Syntax:</strong> =IF(condition, value_if_true, value_if_false)</p><p>Example: =IF(A1>60,"Pass","Fail")</p>',
          vi: '<h3>Hàm IF</h3><p>IF kiểm tra điều kiện và trả về giá trị khác nhau.</p><p><strong>Cú pháp:</strong> =IF(điều_kiện, giá_trị_đúng, giá_trị_sai)</p><p>Ví dụ: =IF(A1>60,"Đạt","Trượt")</p>'
        },
        exercises: [{
          description: { en: 'Determine Pass/Fail (≥60 = Pass)', vi: 'Xác định Đạt/Trượt (≥60 = Đạt)' },
          initialData: [
            {r:0,c:0,v:{v:'Student'}},{r:0,c:1,v:{v:'Score'}},{r:0,c:2,v:{v:'Result'}},
            {r:1,c:0,v:{v:'John'}},{r:1,c:1,v:{v:75}},
            {r:2,c:0,v:{v:'Sarah'}},{r:2,c:1,v:{v:45}},
            {r:3,c:0,v:{v:'Mike'}},{r:3,c:1,v:{v:60}}
          ],
          tasks: [
            {
              cell: 'C2',
              requiredFormula: '=IF(B2>=60,"Pass","Fail")',
              acceptableFormulas: ['=IF(B2>=60,"PASS","FAIL")'],
              description: { en: 'Check if John passed', vi: 'Kiểm tra John đạt hay không' },
              hint: { en: 'IF B2>=60 then Pass else Fail', vi: 'IF B2>=60 thì Đạt không thì Trượt' },
              explanation: { en: '=IF(B2>=60,"Pass","Fail") checks if score ≥60', vi: '=IF(B2>=60,"Pass","Fail") kiểm tra điểm ≥60' }
            },
            {
              cell: 'C3',
              requiredFormula: '=IF(B3>=60,"Pass","Fail")',
              acceptableFormulas: ['=IF(B3>=60,"PASS","FAIL")'],
              description: { en: 'Check if Sarah passed', vi: 'Kiểm tra Sarah đạt hay không' },
              hint: { en: 'Same IF logic for row 3', vi: 'Logic IF tương tự cho hàng 3' },
              explanation: { en: 'Apply same IF logic', vi: 'Áp dụng logic IF tương tự' }
            },
            {
              cell: 'C4',
              requiredFormula: '=IF(B4>=60,"Pass","Fail")',
              acceptableFormulas: ['=IF(B4>=60,"PASS","FAIL")'],
              description: { en: 'Check if Mike passed', vi: 'Kiểm tra Mike đạt hay không' },
              hint: { en: 'Same IF logic for row 4', vi: 'Logic IF tương tự cho hàng 4' },
              explanation: { en: 'Apply same IF logic', vi: 'Áp dụng logic IF tương tự' }
            }
          ]
        }]
      },
      {
        id: 'i2',
        title: { en: 'COUNTIF & SUMIF', vi: 'COUNTIF & SUMIF' },
        description: { en: 'Conditional counting and summing', vi: 'Đếm và cộng có điều kiện' },
        category: 'analysis',
        difficulty: 'medium',
        estimatedTime: 18,
        prerequisites: ['b3','i1'],
        content: {
          en: '<h3>COUNTIF & SUMIF</h3><p>COUNTIF counts cells meeting criteria.</p><p>SUMIF sums cells meeting criteria.</p><p>=COUNTIF(range, criteria)</p><p>=SUMIF(range, criteria, sum_range)</p>',
          vi: '<h3>COUNTIF & SUMIF</h3><p>COUNTIF đếm các ô thỏa điều kiện.</p><p>SUMIF cộng các ô thỏa điều kiện.</p><p>=COUNTIF(phạm_vi, tiêu_chí)</p><p>=SUMIF(phạm_vi, tiêu_chí, phạm_vi_cộng)</p>'
        },
        exercises: [{
          description: { en: 'Count passing grades and sum their scores', vi: 'Đếm số điểm đạt và cộng điểm của họ' },
          initialData: [
            {r:0,c:0,v:{v:'Student'}},{r:0,c:1,v:{v:'Score'}},
            {r:1,c:0,v:{v:'Alice'}},{r:1,c:1,v:{v:85}},
            {r:2,c:0,v:{v:'Bob'}},{r:2,c:1,v:{v:45}},
            {r:3,c:0,v:{v:'Charlie'}},{r:3,c:1,v:{v:78}},
            {r:4,c:0,v:{v:'Diana'}},{r:4,c:1,v:{v:55}},
            {r:5,c:0,v:{v:'Eve'}},{r:5,c:1,v:{v:92}},
            {r:7,c:0,v:{v:'Passed:'}},
            {r:8,c:0,v:{v:'Total:'}}
          ],
          tasks: [
            {
              cell: 'B8',
              requiredFormula: '=COUNTIF(B2:B6,">=60")',
              acceptableFormulas: ['=COUNTIF(B2:B6,">59")'],
              description: { en: 'Count students who passed', vi: 'Đếm sinh viên đạt' },
              hint: { en: 'Use COUNTIF to count scores ≥60', vi: 'Dùng COUNTIF để đếm điểm ≥60' },
              explanation: { en: '=COUNTIF(B2:B6,">=60") counts cells ≥60', vi: '=COUNTIF(B2:B6,">=60") đếm ô ≥60' }
            },
            {
              cell: 'B9',
              requiredFormula: '=SUMIF(B2:B6,">=60")',
              acceptableFormulas: ['=SUMIF(B2:B6,">59")'],
              description: { en: 'Sum passing scores', vi: 'Cộng điểm đạt' },
              hint: { en: 'Use SUMIF to sum scores ≥60', vi: 'Dùng SUMIF để cộng điểm ≥60' },
              explanation: { en: '=SUMIF(B2:B6,">=60") sums scores ≥60', vi: '=SUMIF(B2:B6,">=60") cộng điểm ≥60' }
            }
          ]
        }]
      },
      {
        id: 'i3',
        title: { en: 'Nested IF', vi: 'IF lồng nhau' },
        description: { en: 'Multiple conditions with IF', vi: 'Nhiều điều kiện với IF' },
        category: 'logic',
        difficulty: 'medium',
        estimatedTime: 20,
        prerequisites: ['i1'],
        content: {
          en: '<h3>Nested IF</h3><p>Nest IF functions for multiple conditions.</p><p>=IF(A1>=90,"A",IF(A1>=80,"B",IF(A1>=70,"C","F")))</p><p>This creates letter grades based on scores.</p>',
          vi: '<h3>IF lồng nhau</h3><p>Lồng các hàm IF cho nhiều điều kiện.</p><p>=IF(A1>=90,"A",IF(A1>=80,"B",IF(A1>=70,"C","F")))</p><p>Tạo xếp hạng chữ dựa trên điểm.</p>'
        },
        exercises: [{
          description: { en: 'Assign letter grades (A≥90, B≥80, C≥70, F<70)', vi: 'Gán xếp hạng (A≥90, B≥80, C≥70, F<70)' },
          initialData: [
            {r:0,c:0,v:{v:'Student'}},{r:0,c:1,v:{v:'Score'}},{r:0,c:2,v:{v:'Grade'}},
            {r:1,c:0,v:{v:'Alice'}},{r:1,c:1,v:{v:95}},
            {r:2,c:0,v:{v:'Bob'}},{r:2,c:1,v:{v:85}},
            {r:3,c:0,v:{v:'Charlie'}},{r:3,c:1,v:{v:72}}
          ],
          tasks: [
            {
              cell: 'C2',
              requiredFormula: '=IF(B2>=90,"A",IF(B2>=80,"B",IF(B2>=70,"C","F")))',
              acceptableFormulas: [],
              description: { en: 'Assign grade for Alice', vi: 'Gán xếp hạng cho Alice' },
              hint: { en: 'Nest IFs: ≥90=A, ≥80=B, ≥70=C, else F', vi: 'IF lồng: ≥90=A, ≥80=B, ≥70=C, còn lại F' },
              explanation: { en: 'Nested IF checks multiple conditions in sequence', vi: 'IF lồng kiểm tra nhiều điều kiện theo thứ tự' }
            },
            {
              cell: 'C3',
              requiredFormula: '=IF(B3>=90,"A",IF(B3>=80,"B",IF(B3>=70,"C","F")))',
              acceptableFormulas: [],
              description: { en: 'Assign grade for Bob', vi: 'Gán xếp hạng cho Bob' },
              hint: { en: 'Same nested IF for row 3', vi: 'IF lồng tương tự cho hàng 3' },
              explanation: { en: 'Apply same nested IF logic', vi: 'Áp dụng logic IF lồng tương tự' }
            },
            {
              cell: 'C4',
              requiredFormula: '=IF(B4>=90,"A",IF(B4>=80,"B",IF(B4>=70,"C","F")))',
              acceptableFormulas: [],
              description: { en: 'Assign grade for Charlie', vi: 'Gán xếp hạng cho Charlie' },
              hint: { en: 'Same nested IF for row 4', vi: 'IF lồng tương tự cho hàng 4' },
              explanation: { en: 'Apply same nested IF logic', vi: 'Áp dụng logic IF lồng tương tự' }
            }
          ]
        }]
      },
      {
        id: 'i4',
        title: { en: 'Text Functions', vi: 'Hàm văn bản' },
        description: { en: 'UPPER, LOWER, CONCATENATE', vi: 'UPPER, LOWER, CONCATENATE' },
        category: 'text',
        difficulty: 'medium',
        estimatedTime: 15,
        prerequisites: ['b1'],
        content: {
          en: '<h3>Text Functions</h3><p>=UPPER(text) converts to uppercase</p><p>=LOWER(text) converts to lowercase</p><p>=CONCATENATE(text1,text2,...) joins text</p><p>Or use & operator: =A1&" "&B1</p>',
          vi: '<h3>Hàm văn bản</h3><p>=UPPER(văn_bản) chuyển thành chữ hoa</p><p>=LOWER(văn_bản) chuyển thành chữ thường</p><p>=CONCATENATE(text1,text2,...) nối văn bản</p><p>Hoặc dùng &: =A1&" "&B1</p>'
        },
        exercises: [{
          description: { en: 'Format names: uppercase last, full name', vi: 'Định dạng tên: họ viết hoa, tên đầy đủ' },
          initialData: [
            {r:0,c:0,v:{v:'First'}},{r:0,c:1,v:{v:'Last'}},{r:0,c:2,v:{v:'Upper Last'}},{r:0,c:3,v:{v:'Full Name'}},
            {r:1,c:0,v:{v:'john'}},{r:1,c:1,v:{v:'doe'}},
            {r:2,c:0,v:{v:'jane'}},{r:2,c:1,v:{v:'smith'}}
          ],
          tasks: [
            {
              cell: 'C2',
              requiredFormula: '=UPPER(B2)',
              acceptableFormulas: [],
              description: { en: 'Convert last name to uppercase', vi: 'Chuyển họ thành chữ hoa' },
              hint: { en: 'Use UPPER on last name (B2)', vi: 'Dùng UPPER cho họ (B2)' },
              explanation: { en: '=UPPER(B2) converts last name to uppercase', vi: '=UPPER(B2) chuyển họ thành chữ hoa' }
            },
            {
              cell: 'D2',
              requiredFormula: '=A2&" "&B2',
              acceptableFormulas: ['=CONCATENATE(A2," ",B2)'],
              description: { en: 'Create full name', vi: 'Tạo tên đầy đủ' },
              hint: { en: 'Combine first and last with space', vi: 'Kết hợp tên và họ có khoảng trắng' },
              explanation: { en: '=A2&" "&B2 joins first and last name', vi: '=A2&" "&B2 nối tên và họ' }
            },
            {
              cell: 'C3',
              requiredFormula: '=UPPER(B3)',
              acceptableFormulas: [],
              description: { en: 'Convert last name to uppercase', vi: 'Chuyển họ thành chữ hoa' },
              hint: { en: 'Same for row 3', vi: 'Tương tự cho hàng 3' },
              explanation: { en: 'Apply UPPER to row 3', vi: 'Áp dụng UPPER cho hàng 3' }
            },
            {
              cell: 'D3',
              requiredFormula: '=A3&" "&B3',
              acceptableFormulas: ['=CONCATENATE(A3," ",B3)'],
              description: { en: 'Create full name', vi: 'Tạo tên đầy đủ' },
              hint: { en: 'Same for row 3', vi: 'Tương tự cho hàng 3' },
              explanation: { en: 'Join names in row 3', vi: 'Nối tên ở hàng 3' }
            }
          ]
        }]
      }
    ],
    advanced: [
      {
        id: 'a1',
        title: { en: 'VLOOKUP', vi: 'VLOOKUP' },
        description: { en: 'Vertical lookup in tables', vi: 'Tra cứu dọc trong bảng' },
        category: 'lookup',
        difficulty: 'hard',
        estimatedTime: 25,
        prerequisites: ['i1','i2'],
        content: {
          en: '<h3>VLOOKUP</h3><p>VLOOKUP searches for a value in the first column and returns a value from another column.</p><p><strong>Syntax:</strong> =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</p><p>Example: =VLOOKUP("Apple",A1:C10,3,FALSE)</p>',
          vi: '<h3>VLOOKUP</h3><p>VLOOKUP tìm kiếm giá trị trong cột đầu và trả về giá trị từ cột khác.</p><p><strong>Cú pháp:</strong> =VLOOKUP(giá_trị_tìm, vùng_bảng, số_cột, [tìm_gần_đúng])</p><p>Ví dụ: =VLOOKUP("Táo",A1:C10,3,FALSE)</p>'
        },
        exercises: [{
          description: { en: 'Look up product prices', vi: 'Tra cứu giá sản phẩm' },
          initialData: [
            {r:0,c:0,v:{v:'Code'}},{r:0,c:1,v:{v:'Product'}},{r:0,c:2,v:{v:'Price'}},
            {r:1,c:0,v:{v:'A001'}},{r:1,c:1,v:{v:'Apple'}},{r:1,c:2,v:{v:2}},
            {r:2,c:0,v:{v:'B002'}},{r:2,c:1,v:{v:'Banana'}},{r:2,c:2,v:{v:1}},
            {r:3,c:0,v:{v:'C003'}},{r:3,c:1,v:{v:'Cherry'}},{r:3,c:2,v:{v:5}},
            {r:5,c:0,v:{v:'Find:'}},{r:5,c:1,v:{v:'B002'}},
            {r:6,c:0,v:{v:'Product:'}},
            {r:7,c:0,v:{v:'Price:'}}
          ],
          tasks: [
            {
              cell: 'B7',
              requiredFormula: '=VLOOKUP(B6,A2:C4,2,FALSE)',
              acceptableFormulas: ['=VLOOKUP(B6,$A$2:$C$4,2,FALSE)','=VLOOKUP(B6,A2:C4,2,0)'],
              description: { en: 'Look up product name', vi: 'Tra tên sản phẩm' },
              hint: { en: 'VLOOKUP in A2:C4, return column 2', vi: 'VLOOKUP trong A2:C4, trả về cột 2' },
              explanation: { en: 'VLOOKUP finds B002 and returns product name', vi: 'VLOOKUP tìm B002 và trả về tên sản phẩm' }
            },
            {
              cell: 'B8',
              requiredFormula: '=VLOOKUP(B6,A2:C4,3,FALSE)',
              acceptableFormulas: ['=VLOOKUP(B6,$A$2:$C$4,3,FALSE)','=VLOOKUP(B6,A2:C4,3,0)'],
              description: { en: 'Look up product price', vi: 'Tra giá sản phẩm' },
              hint: { en: 'VLOOKUP in A2:C4, return column 3', vi: 'VLOOKUP trong A2:C4, trả về cột 3' },
              explanation: { en: 'VLOOKUP finds B002 and returns price', vi: 'VLOOKUP tìm B002 và trả về giá' }
            }
          ]
        }]
      },
      {
        id: 'a2',
        title: { en: 'INDEX MATCH', vi: 'INDEX MATCH' },
        description: { en: 'Powerful alternative to VLOOKUP', vi: 'Thay thế mạnh mẽ cho VLOOKUP' },
        category: 'lookup',
        difficulty: 'hard',
        estimatedTime: 28,
        prerequisites: ['a1'],
        content: {
          en: '<h3>INDEX MATCH</h3><p>INDEX returns value at intersection.</p><p>MATCH returns position of value.</p><p>=INDEX(return_array, MATCH(lookup_value, lookup_array, 0))</p><p>More flexible than VLOOKUP!</p>',
          vi: '<h3>INDEX MATCH</h3><p>INDEX trả về giá trị tại giao điểm.</p><p>MATCH trả về vị trí của giá trị.</p><p>=INDEX(mảng_trả_về, MATCH(giá_trị_tìm, mảng_tìm, 0))</p><p>Linh hoạt hơn VLOOKUP!</p>'
        },
        exercises: [{
          description: { en: 'Lookup using INDEX MATCH', vi: 'Tra cứu bằng INDEX MATCH' },
          initialData: [
            {r:0,c:0,v:{v:'Product'}},{r:0,c:1,v:{v:'Price'}},{r:0,c:2,v:{v:'Stock'}},
            {r:1,c:0,v:{v:'Laptop'}},{r:1,c:1,v:{v:899}},{r:1,c:2,v:{v:15}},
            {r:2,c:0,v:{v:'Mouse'}},{r:2,c:1,v:{v:25}},{r:2,c:2,v:{v:50}},
            {r:3,c:0,v:{v:'Keyboard'}},{r:3,c:1,v:{v:75}},{r:3,c:2,v:{v:30}},
            {r:5,c:0,v:{v:'Find:'}},{r:5,c:1,v:{v:'Mouse'}},
            {r:6,c:0,v:{v:'Price:'}},
            {r:7,c:0,v:{v:'Stock:'}}
          ],
          tasks: [
            {
              cell: 'B7',
              requiredFormula: '=INDEX(B2:B4,MATCH(B6,A2:A4,0))',
              acceptableFormulas: ['=INDEX($B$2:$B$4,MATCH(B6,$A$2:$A$4,0))'],
              description: { en: 'Find price of Mouse', vi: 'Tìm giá của Mouse' },
              hint: { en: 'Use INDEX and MATCH to find price', vi: 'Dùng INDEX và MATCH để tìm giá' },
              explanation: { en: 'INDEX returns value from B2:B4 at position found by MATCH', vi: 'INDEX trả về giá trị từ B2:B4 tại vị trí tìm bởi MATCH' }
            },
            {
              cell: 'B8',
              requiredFormula: '=INDEX(C2:C4,MATCH(B6,A2:A4,0))',
              acceptableFormulas: ['=INDEX($C$2:$C$4,MATCH(B6,$A$2:$A$4,0))'],
              description: { en: 'Find stock of Mouse', vi: 'Tìm tồn kho của Mouse' },
              hint: { en: 'Use INDEX and MATCH to find stock', vi: 'Dùng INDEX và MATCH để tìm tồn kho' },
              explanation: { en: 'INDEX returns value from C2:C4 at position found by MATCH', vi: 'INDEX trả về giá trị từ C2:C4 tại vị trí tìm bởi MATCH' }
            }
          ]
        }]
      },
      {
        id: 'a3',
        title: { en: 'SUMIFS & COUNTIFS', vi: 'SUMIFS & COUNTIFS' },
        description: { en: 'Multiple criteria analysis', vi: 'Phân tích đa tiêu chí' },
        category: 'analysis',
        difficulty: 'hard',
        estimatedTime: 22,
        prerequisites: ['i2'],
        content: {
          en: '<h3>SUMIFS & COUNTIFS</h3><p>Handle multiple criteria at once.</p><p>=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)</p><p>=COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...)</p>',
          vi: '<h3>SUMIFS & COUNTIFS</h3><p>Xử lý nhiều tiêu chí cùng lúc.</p><p>=SUMIFS(phạm_vi_cộng, phạm_vi_tc1, tc1, phạm_vi_tc2, tc2, ...)</p><p>=COUNTIFS(phạm_vi_tc1, tc1, phạm_vi_tc2, tc2, ...)</p>'
        },
        exercises: [{
          description: { en: 'Sum sales: Electronics AND >100', vi: 'Cộng doanh số: Electronics VÀ >100' },
          initialData: [
            {r:0,c:0,v:{v:'Product'}},{r:0,c:1,v:{v:'Category'}},{r:0,c:2,v:{v:'Sales'}},
            {r:1,c:0,v:{v:'Laptop'}},{r:1,c:1,v:{v:'Electronics'}},{r:1,c:2,v:{v:150}},
            {r:2,c:0,v:{v:'Shirt'}},{r:2,c:1,v:{v:'Clothing'}},{r:2,c:2,v:{v:50}},
            {r:3,c:0,v:{v:'Phone'}},{r:3,c:1,v:{v:'Electronics'}},{r:3,c:2,v:{v:200}},
            {r:4,c:0,v:{v:'Shoes'}},{r:4,c:1,v:{v:'Clothing'}},{r:4,c:2,v:{v:80}},
            {r:5,c:0,v:{v:'Mouse'}},{r:5,c:1,v:{v:'Electronics'}},{r:5,c:2,v:{v:25}},
            {r:7,c:0,v:{v:'Total:'}},
            {r:8,c:0,v:{v:'Count:'}}
          ],
          tasks: [
            {
              cell: 'C8',
              requiredFormula: '=SUMIFS(C2:C6,B2:B6,"Electronics",C2:C6,">100")',
              acceptableFormulas: ['=SUMIFS($C$2:$C$6,$B$2:$B$6,"Electronics",$C$2:$C$6,">100")'],
              description: { en: 'Sum Electronics sales >100', vi: 'Cộng doanh số Electronics >100' },
              hint: { en: 'SUMIFS: sum C2:C6 where B2:B6="Electronics" AND C2:C6>100', vi: 'SUMIFS: cộng C2:C6 khi B2:B6="Electronics" VÀ C2:C6>100' },
              explanation: { en: 'SUMIFS adds values meeting both criteria', vi: 'SUMIFS cộng giá trị thỏa cả hai tiêu chí' }
            },
            {
              cell: 'C9',
              requiredFormula: '=COUNTIFS(B2:B6,"Electronics",C2:C6,">100")',
              acceptableFormulas: ['=COUNTIFS($B$2:$B$6,"Electronics",$C$2:$C$6,">100")'],
              description: { en: 'Count Electronics sales >100', vi: 'Đếm doanh số Electronics >100' },
              hint: { en: 'COUNTIFS: count where B2:B6="Electronics" AND C2:C6>100', vi: 'COUNTIFS: đếm khi B2:B6="Electronics" VÀ C2:C6>100' },
              explanation: { en: 'COUNTIFS counts cells meeting both criteria', vi: 'COUNTIFS đếm ô thỏa cả hai tiêu chí' }
            }
          ]
        }]
      },
      {
        id: 'a4',
        title: { en: 'Date Functions', vi: 'Hàm ngày tháng' },
        description: { en: 'TODAY, YEAR, MONTH, DAY, DATEDIF', vi: 'TODAY, YEAR, MONTH, DAY, DATEDIF' },
        category: 'datetime',
        difficulty: 'hard',
        estimatedTime: 20,
        prerequisites: ['b1','b2'],
        content: {
          en: '<h3>Date Functions</h3><p>=TODAY() returns current date</p><p>=YEAR(date), =MONTH(date), =DAY(date) extract parts</p><p>=DATEDIF(start_date, end_date, "D") calculates difference in days</p>',
          vi: '<h3>Hàm ngày</h3><p>=TODAY() trả về ngày hiện tại</p><p>=YEAR(ngày), =MONTH(ngày), =DAY(ngày) tách thành phần</p><p>=DATEDIF(ngày_đầu, ngày_cuối, "D") tính chênh lệch ngày</p>'
        },
        exercises: [{
          description: { en: 'Extract date parts and calculate age', vi: 'Tách thành phần ngày và tính tuổi' },
          initialData: [
            {r:0,c:0,v:{v:'Birth Date'}},{r:0,c:1,v:{v:'Year'}},{r:0,c:2,v:{v:'Month'}},{r:0,c:3,v:{v:'Age'}},
            {r:1,c:0,v:{v:'1990-05-15'}},
            {r:2,c:0,v:{v:'1985-12-20'}}
          ],
          tasks: [
            {
              cell: 'B2',
              requiredFormula: '=YEAR(A2)',
              acceptableFormulas: [],
              description: { en: 'Extract birth year', vi: 'Lấy năm sinh' },
              hint: { en: 'Extract year from A2', vi: 'Lấy năm từ A2' },
              explanation: { en: '=YEAR(A2) extracts year from date', vi: '=YEAR(A2) lấy năm từ ngày' }
            },
            {
              cell: 'C2',
              requiredFormula: '=MONTH(A2)',
              acceptableFormulas: [],
              description: { en: 'Extract birth month', vi: 'Lấy tháng sinh' },
              hint: { en: 'Extract month from A2', vi: 'Lấy tháng từ A2' },
              explanation: { en: '=MONTH(A2) extracts month', vi: '=MONTH(A2) lấy tháng' }
            },
            {
              cell: 'D2',
              requiredFormula: '=DATEDIF(A2,TODAY(),"Y")',
              acceptableFormulas: [],
              description: { en: 'Calculate current age', vi: 'Tính tuổi hiện tại' },
              hint: { en: 'Calculate age in years using DATEDIF', vi: 'Tính tuổi bằng năm dùng DATEDIF' },
              explanation: { en: '=DATEDIF(A2,TODAY(),"Y") calculates age in years', vi: '=DATEDIF(A2,TODAY(),"Y") tính tuổi theo năm' }
            }
          ]
        }]
      },
      {
        id: 'a5',
        title: { en: 'Complex Dashboard', vi: 'Bảng điều khiển phức tạp' },
        description: { en: 'Combined functions for analysis', vi: 'Kết hợp hàm để phân tích' },
        category: 'analysis',
        difficulty: 'hard',
        estimatedTime: 30,
        prerequisites: ['a1','a3','i3'],
        content: {
          en: '<h3>Complex Analysis</h3><p>Combine multiple functions:</p><p>• Nested IF with AND/OR</p><p>• SUMIFS with multiple criteria</p><p>• INDEX MATCH for lookups</p><p>Build a complete analysis dashboard!</p>',
          vi: '<h3>Phân tích phức tạp</h3><p>Kết hợp nhiều hàm:</p><p>• IF lồng với AND/OR</p><p>• SUMIFS với nhiều tiêu chí</p><p>• INDEX MATCH để tra cứu</p><p>Xây dựng bảng phân tích hoàn chỉnh!</p>'
        },
        exercises: [{
          description: { en: 'Analyze sales: status, category totals, performance', vi: 'Phân tích doanh số: trạng thái, tổng danh mục, hiệu suất' },
          initialData: [
            {r:0,c:0,v:{v:'Product'}},{r:0,c:1,v:{v:'Category'}},{r:0,c:2,v:{v:'Sales'}},{r:0,c:3,v:{v:'Target'}},{r:0,c:4,v:{v:'Status'}},
            {r:1,c:0,v:{v:'Laptop'}},{r:1,c:1,v:{v:'Electronics'}},{r:1,c:2,v:{v:150}},{r:1,c:3,v:{v:100}},
            {r:2,c:0,v:{v:'Shirt'}},{r:2,c:1,v:{v:'Clothing'}},{r:2,c:2,v:{v:50}},{r:2,c:3,v:{v:80}},
            {r:3,c:0,v:{v:'Phone'}},{r:3,c:1,v:{v:'Electronics'}},{r:3,c:2,v:{v:200}},{r:3,c:3,v:{v:150}},
            {r:5,c:0,v:{v:'Electronics Total:'}},
            {r:6,c:0,v:{v:'High Performers:'}}
          ],
          tasks: [
            {
              cell: 'E2',
              requiredFormula: '=IF(C2>=D2,"Target Met","Below Target")',
              acceptableFormulas: ['=IF(C2>=D2,"TARGET MET","BELOW TARGET")'],
              description: { en: 'Check Laptop target status', vi: 'Kiểm tra trạng thái mục tiêu Laptop' },
              hint: { en: 'IF sales >= target show "Target Met"', vi: 'IF doanh số >= mục tiêu hiện "Target Met"' },
              explanation: { en: 'Compares sales to target', vi: 'So sánh doanh số với mục tiêu' }
            },
            {
              cell: 'E3',
              requiredFormula: '=IF(C3>=D3,"Target Met","Below Target")',
              acceptableFormulas: ['=IF(C3>=D3,"TARGET MET","BELOW TARGET")'],
              description: { en: 'Check Shirt target status', vi: 'Kiểm tra trạng thái mục tiêu Shirt' },
              hint: { en: 'Same for row 3', vi: 'Tương tự cho hàng 3' },
              explanation: { en: 'Status for row 3', vi: 'Trạng thái cho hàng 3' }
            },
            {
              cell: 'E4',
              requiredFormula: '=IF(C4>=D4,"Target Met","Below Target")',
              acceptableFormulas: ['=IF(C4>=D4,"TARGET MET","BELOW TARGET")'],
              description: { en: 'Check Phone target status', vi: 'Kiểm tra trạng thái mục tiêu Phone' },
              hint: { en: 'Same for row 4', vi: 'Tương tự cho hàng 4' },
              explanation: { en: 'Status for row 4', vi: 'Trạng thái cho hàng 4' }
            },
            {
              cell: 'B6',
              requiredFormula: '=SUMIF(B2:B4,"Electronics",C2:C4)',
              acceptableFormulas: ['=SUMIF($B$2:$B$4,"Electronics",$C$2:$C$4)'],
              description: { en: 'Total Electronics sales', vi: 'Tổng doanh số Electronics' },
              hint: { en: 'Sum sales where category is Electronics', vi: 'Cộng doanh số của danh mục Electronics' },
              explanation: { en: 'SUMIF totals Electronics sales', vi: 'SUMIF cộng tổng doanh số Electronics' }
            },
            {
              cell: 'B7',
              requiredFormula: '=COUNTIFS(C2:C4,">=150")',
              acceptableFormulas: ['=COUNTIFS($C$2:$C$4,">=150")'],
              description: { en: 'Count high performers', vi: 'Đếm sản phẩm hiệu suất cao' },
              hint: { en: 'Count products with sales >= 150', vi: 'Đếm sản phẩm có doanh số >= 150' },
              explanation: { en: 'Counts high-performing products', vi: 'Đếm sản phẩm hiệu suất cao' }
            }
          ]
        }]
      }
    ],

    professional: [
      {
        id: 'p6',
        title: {
          en: 'Advanced Exam Data Processing',
          vi: 'Xử lý dữ liệu thi nâng cao'
        },
        description: {
          en: 'Real-world Excel exam combining VLOOKUP, HLOOKUP, INDEX & MATCH',
          vi: 'Bài thi Excel thực tế kết hợp VLOOKUP, HLOOKUP, INDEX & MATCH'
        },
        category: 'analysis',
        difficulty: 'professional',
        estimatedTime: 45,
        prerequisites: ['a2','a4','a5'],
        content: {
          en: `
            <h3>Advanced Excel Exam</h3>
            <p>This task simulates a real IT Excel exam:</p>
            <p>• Lookup subject scores using INDEX + MATCH (2D)</p>
            <p>• Apply semester coefficient with HLOOKUP</p>
            <p>• Calculate final score using VLOOKUP</p>
            <p>• Classify student results</p>
          `,
          vi: `
            <h3>Bài thi Excel nâng cao</h3>
            <p>Mô phỏng bài thi CNTT Excel thực tế:</p>
            <p>• Tra cứu điểm theo 2 chiều bằng INDEX + MATCH</p>
            <p>• Áp dụng hệ số học kỳ bằng HLOOKUP</p>
            <p>• Tính điểm cuối bằng VLOOKUP</p>
            <p>• Xếp loại kết quả sinh viên</p>
          `
        },

        exercises: [{
          description: {
            en: 'Process student exam results and classification',
            vi: 'Xử lý kết quả thi và xếp loại sinh viên'
          },

          initialData: [
            {r:0,c:0,v:{v:'Student'}},{r:0,c:1,v:{v:'Math'}},{r:0,c:2,v:{v:'IT'}},{r:0,c:3,v:{v:'English'}},
            {r:1,c:0,v:{v:'SV01'}},{r:1,c:1,v:{v:8}},{r:1,c:2,v:{v:9}},{r:1,c:3,v:{v:7}},
            {r:2,c:0,v:{v:'SV02'}},{r:2,c:1,v:{v:6}},{r:2,c:2,v:{v:7}},{r:2,c:3,v:{v:8}},
            {r:3,c:0,v:{v:'SV03'}},{r:3,c:1,v:{v:9}},{r:3,c:2,v:{v:8}},{r:3,c:3,v:{v:9}},
            {r:5,c:1,v:{v:'Semester 1'}},{r:5,c:2,v:{v:'Semester 2'}},
            {r:6,c:0,v:{v:'Coefficient'}},{r:6,c:1,v:{v:1}},{r:6,c:2,v:{v:1.2}},
            {r:8,c:0,v:{v:'Score'}},{r:8,c:1,v:{v:'Grade'}},
            {r:9,c:0,v:{v:0}},{r:9,c:1,v:{v:'Fail'}},
            {r:10,c:0,v:{v:5}},{r:10,c:1,v:{v:'Average'}},
            {r:11,c:0,v:{v:7}},{r:11,c:1,v:{v:'Good'}},
            {r:12,c:0,v:{v:8.5}},{r:12,c:1,v:{v:'Excellent'}},
            {r:1,c:5,v:{v:'Final Score'}},
            {r:1,c:6,v:{v:'Grade'}}
          ],

          tasks: [
            {
              cell: 'F2',
              requiredFormula: '=INDEX(B2:D2,MATCH("IT",B1:D1,0))*HLOOKUP("Semester 2",B6:C7,2,0)',
              acceptableFormulas: [
                '=INDEX($B2:$D2,MATCH("IT",$B$1:$D$1,0))*HLOOKUP("Semester 2",$B$6:$C$7,2,0)'
              ],
              description: { en: 'Calculate final score', vi: 'Tính điểm cuối kỳ' },
              hint: {
                en: 'Final score = IT score × Semester 2 coefficient',
                vi: 'Điểm cuối = điểm IT × hệ số học kỳ 2'
              },
              explanation: {
                en: 'Uses INDEX MATCH (2D) combined with HLOOKUP',
                vi: 'Kết hợp INDEX MATCH 2 chiều và HLOOKUP'
              }
            },

            {
              cell: 'G2',
              requiredFormula: '=VLOOKUP(F2,A9:B12,2,TRUE)',
              acceptableFormulas: [
                '=VLOOKUP(F2,$A$9:$B$12,2,TRUE)'
              ],
              description: { en: 'Classify student grade', vi: 'Xếp loại sinh viên' },
              hint: {
                en: 'Look up grade based on final score',
                vi: 'Tra xếp loại dựa trên điểm cuối'
              },
              explanation: {
                en: 'Uses VLOOKUP with approximate match',
                vi: 'Sử dụng VLOOKUP dò gần đúng'
              }
            }
          ]
        }]
      },

      {
        id: 'p7',
        title: {
          en: 'Sales Invoice Processing',
          vi: 'Xử lý hóa đơn bán hàng'
        },
        description: {
          en: 'Real Excel IT exam: lookup, pricing and commission calculation',
          vi: 'Bài thi CNTT Excel thực tế: tra cứu, tính giá và hoa hồng'
        },
        category: 'analysis',
        difficulty: 'professional',
        estimatedTime: 40,
        prerequisites: ['a3','a5','p6'],
        content: {
          en: `
            <h3>Sales Data Processing</h3>
            <p>Skills required:</p>
            <p>• LEFT + VLOOKUP for product identification</p>
            <p>• HLOOKUP for price table</p>
            <p>• IF for commission calculation</p>
            <p>• Real-world invoice logic</p>
          `,
          vi: `
            <h3>Xử lý dữ liệu bán hàng</h3>
            <p>Kỹ năng cần có:</p>
            <p>• LEFT + VLOOKUP để xác định hàng hóa</p>
            <p>• HLOOKUP tra bảng giá</p>
            <p>• IF để tính hoa hồng</p>
            <p>• Logic hóa đơn thực tế</p>
          `
        },

        exercises: [{
          description: {
            en: 'Calculate product info, price difference and commission',
            vi: 'Tính thông tin hàng hóa, chênh lệch giá và hoa hồng'
          },

          initialData: [
            {r:0,c:0,v:{v:'STT'}},{r:0,c:1,v:{v:'Product Code'}},{r:0,c:2,v:{v:'Product Name'}},
            {r:0,c:3,v:{v:'Quantity'}},{r:0,c:4,v:{v:'Buy Price'}},{r:0,c:5,v:{v:'Sell Price'}},
            {r:0,c:6,v:{v:'Price Diff'}},{r:0,c:7,v:{v:'Commission'}},
            {r:1,c:0,v:{v:1}},{r:1,c:1,v:{v:'S100X'}},{r:1,c:3,v:{v:10}},
            {r:2,c:0,v:{v:2}},{r:2,c:1,v:{v:'M200Y'}},{r:2,c:3,v:{v:5}},
            {r:3,c:0,v:{v:3}},{r:3,c:1,v:{v:'D150X'}},{r:3,c:3,v:{v:8}},
            {r:4,c:0,v:{v:4}},{r:4,c:1,v:{v:'N120X'}},{r:4,c:3,v:{v:12}},
            {r:6,c:0,v:{v:'Product Type'}},{r:6,c:1,v:{v:'Product Name'}},{r:6,c:2,v:{v:'Buy Price'}},
            {r:7,c:0,v:{v:'S'}},{r:7,c:1,v:{v:'Milk'}},{r:7,c:2,v:{v:300000}},
            {r:8,c:0,v:{v:'M'}},{r:8,c:1,v:{v:'Salt'}},{r:8,c:2,v:{v:150000}},
            {r:9,c:0,v:{v:'D'}},{r:9,c:1,v:{v:'Sugar'}},{r:9,c:2,v:{v:250000}},
            {r:10,c:0,v:{v:'N'}},{r:10,c:1,v:{v:'Mineral Water'}},{r:10,c:2,v:{v:75000}},
            {r:6,c:4,v:{v:'Type'}},{r:6,c:5,v:{v:'S'}},{r:6,c:6,v:{v:'M'}},{r:6,c:7,v:{v:'D'}},{r:6,c:8,v:{v:'N'}},
            {r:7,c:4,v:{v:'Sell Price'}},{r:7,c:5,v:{v:350}},{r:7,c:6,v:{v:200}},{r:7,c:7,v:{v:300}},{r:7,c:8,v:{v:100}}
          ],

          tasks: [
            {
              cell: 'C2',
              requiredFormula: '=VLOOKUP(LEFT(B2,1),A8:C11,2,0)',
              acceptableFormulas: ['=VLOOKUP(LEFT(B2,1),$A$8:$C$11,2,0)'],
              description: { en: 'Look up product name', vi: 'Tra tên sản phẩm' },
              hint: {
                en: 'Extract first letter of code, then VLOOKUP product name',
                vi: 'Lấy ký tự đầu của mã, sau đó VLOOKUP tên sản phẩm'
              },
              explanation: {
                en: 'LEFT extracts code, VLOOKUP returns product name',
                vi: 'LEFT lấy ký tự đầu, VLOOKUP trả về tên hàng'
              }
            },

            {
              cell: 'E2',
              requiredFormula: '=VLOOKUP(LEFT(B2,1),A8:C11,3,0)',
              acceptableFormulas: ['=VLOOKUP(LEFT(B2,1),$A$8:$C$11,3,0)'],
              description: { en: 'Look up buy price', vi: 'Tra đơn giá mua' },
              hint: {
                en: 'Use LEFT + VLOOKUP to get buy price from table',
                vi: 'Dùng LEFT + VLOOKUP để lấy đơn giá mua từ bảng'
              },
              explanation: {
                en: 'Buy price from lookup table',
                vi: 'Đơn giá mua từ bảng tra'
              }
            },

            {
              cell: 'F2',
              requiredFormula: '=HLOOKUP(LEFT(B2,1),F7:J8,2,0)',
              acceptableFormulas: ['=HLOOKUP(LEFT(B2,1),$F$7:$J$8,2,0)'],
              description: { en: 'Look up sell price', vi: 'Tra đơn giá bán' },
              hint: {
                en: 'Use HLOOKUP to get sell price from horizontal table',
                vi: 'Dùng HLOOKUP để tra đơn giá bán từ bảng ngang'
              },
              explanation: {
                en: 'Sell price is listed horizontally in the table',
                vi: 'Đơn giá bán được bố trí theo hàng ngang'
              }
            },

            {
              cell: 'G2',
              requiredFormula: '=(F2-E2)*D2',
              acceptableFormulas: [],
              description: { en: 'Calculate price difference', vi: 'Tính chênh lệch giá' },
              hint: {
                en: 'Total difference = (Sell - Buy) × Quantity',
                vi: 'Chênh lệch = (Giá bán - Giá mua) × Số lượng'
              },
              explanation: {
                en: 'Total price difference calculation',
                vi: 'Tính tổng tiền chênh lệch'
              }
            },

            {
              cell: 'H2',
              requiredFormula: '=IF(G2>0,G2*10%,0)',
              acceptableFormulas: ['=IF(G2>0,G2*0.1,0)'],
              description: { en: 'Calculate commission', vi: 'Tính hoa hồng' },
              hint: {
                en: 'Commission = 10% if profit > 0, otherwise 0',
                vi: 'Hoa hồng = 10% nếu lãi > 0, ngược lại = 0'
              },
              explanation: {
                en: 'Conditional commission calculation',
                vi: 'Tính hoa hồng có điều kiện'
              }
            }
          ]
        }]
      },
    ],
    
    expert: [
      {
        id: 'e1',
        title: {
          en: 'Advanced Sales Performance & Bonus Analysis',
          vi: 'Phân tích hiệu suất bán hàng & thưởng nâng cao'
        },
        description: {
          en: 'Expert-level Excel challenge: multi-condition logic, dynamic lookup and ranking',
          vi: 'Thử thách Excel cấp chuyên gia: logic đa điều kiện, tra cứu động và xếp hạng'
        },
        category: 'analysis',
        difficulty: 'expert',
        estimatedTime: 70,
        prerequisites: ['p7'],
        content: {
          en: `
            <h3>Advanced Sales Analysis</h3>
            <p>Skills required:</p>
            <p>• LEFT + MID + VALUE to decode complex product codes</p>
            <p>• INDEX + MATCH instead of VLOOKUP</p>
            <p>• IF + AND + OR for multi-level bonus logic</p>
            <p>• RANK + IF for performance ranking</p>
            <p>• Real business KPI & reward system</p>
          `,
          vi: `
            <h3>Phân tích bán hàng nâng cao</h3>
            <p>Kỹ năng cần có:</p>
            <p>• LEFT + MID + VALUE để giải mã mã hàng phức tạp</p>
            <p>• INDEX + MATCH thay thế VLOOKUP</p>
            <p>• IF + AND + OR cho logic thưởng nhiều tầng</p>
            <p>• RANK + IF để xếp hạng hiệu suất</p>
            <p>• Logic KPI & thưởng doanh nghiệp thực tế</p>
          `
        },

        exercises: [{
          description: {
            en: 'Decode product code, calculate revenue, bonus and rank employees',
            vi: 'Giải mã mã hàng, tính doanh thu, thưởng và xếp hạng nhân viên'
          },

          initialData: [
            {r:0,c:0,v:{v:'Emp ID'}},{r:0,c:1,v:{v:'Product Code'}},{r:0,c:2,v:{v:'Product'}},
            {r:0,c:3,v:{v:'Quantity'}},{r:0,c:4,v:{v:'Unit Price'}},{r:0,c:5,v:{v:'Revenue'}},
            {r:0,c:6,v:{v:'Bonus'}},{r:0,c:7,v:{v:'Rank'}},
            {r:1,c:0,v:{v:'E01'}},{r:1,c:1,v:{v:'S-120-A'}},{r:1,c:3,v:{v:15}},
            {r:2,c:0,v:{v:'E02'}},{r:2,c:1,v:{v:'M-80-B'}},{r:2,c:3,v:{v:30}},
            {r:3,c:0,v:{v:'E03'}},{r:3,c:1,v:{v:'D-200-A'}},{r:3,c:3,v:{v:10}},
            {r:4,c:0,v:{v:'E04'}},{r:4,c:1,v:{v:'N-50-C'}},{r:4,c:3,v:{v:40}},
            {r:6,c:0,v:{v:'Type'}},{r:6,c:1,v:{v:'Product Name'}},{r:6,c:2,v:{v:'Base Price'}},
            {r:7,c:0,v:{v:'S'}},{r:7,c:1,v:{v:'Milk'}},{r:7,c:2,v:{v:30}},
            {r:8,c:0,v:{v:'M'}},{r:8,c:1,v:{v:'Salt'}},{r:8,c:2,v:{v:20}},
            {r:9,c:0,v:{v:'D'}},{r:9,c:1,v:{v:'Sugar'}},{r:9,c:2,v:{v:25}},
            {r:10,c:0,v:{v:'N'}},{r:10,c:1,v:{v:'Water'}},{r:10,c:2,v:{v:10}}
          ],

          tasks: [
            {
              cell: 'C2',
              requiredFormula: '=INDEX(B8:B11,MATCH(LEFT(B2,1),A8:A11,0))',
              acceptableFormulas: [
                '=INDEX($B$8:$B$11,MATCH(LEFT(B2,1),$A$8:$A$11,0))'
              ],
              description: { en: 'Look up product name', vi: 'Tra tên sản phẩm' },
              hint: {
                en: 'Decode product type using LEFT, then INDEX + MATCH',
                vi: 'Dùng LEFT lấy loại sản phẩm, sau đó INDEX + MATCH'
              },
              explanation: {
                en: 'INDEX + MATCH is more flexible than VLOOKUP',
                vi: 'INDEX + MATCH linh hoạt hơn VLOOKUP'
              }
            },

            {
              cell: 'E2',
              requiredFormula: '=INDEX(C8:C11,MATCH(LEFT(B2,1),A8:A11,0))*VALUE(MID(B2,3,3))',
              acceptableFormulas: [
                '=INDEX($C$8:$C$11,MATCH(LEFT(B2,1),$A$8:$A$11,0))*VALUE(MID(B2,3,3))'
              ],
              description: { en: 'Calculate dynamic unit price', vi: 'Tính đơn giá động' },
              hint: {
                en: 'Combine LEFT + MID + VALUE with INDEX + MATCH',
                vi: 'Kết hợp LEFT + MID + VALUE với INDEX + MATCH'
              },
              explanation: {
                en: 'MID extracts factor, VALUE converts to number',
                vi: 'MID lấy hệ số, VALUE chuyển thành số'
              }
            },

            {
              cell: 'F2',
              requiredFormula: '=D2*E2',
              acceptableFormulas: [],
              description: { en: 'Calculate revenue', vi: 'Tính doanh thu' },
              hint: {
                en: 'Revenue = Quantity × Unit Price',
                vi: 'Doanh thu = Số lượng × Đơn giá'
              },
              explanation: {
                en: 'Basic revenue calculation',
                vi: 'Tính doanh thu cơ bản'
              }
            },

            {
              cell: 'G2',
              requiredFormula: '=IF(AND(F2>=5000,RIGHT(B2,1)="A"),F2*15%,IF(F2>=3000,F2*10%,0))',
              acceptableFormulas: [
                '=IF(AND(F2>=5000,RIGHT(B2,1)="A"),F2*0.15,IF(F2>=3000,F2*0.1,0))'
              ],
              description: { en: 'Calculate tiered bonus', vi: 'Tính thưởng theo bậc' },
              hint: {
                en: 'Use IF + AND + RIGHT for multi-level bonus',
                vi: 'Dùng IF + AND + RIGHT cho thưởng nhiều tầng'
              },
              explanation: {
                en: 'High revenue + premium product = higher bonus',
                vi: 'Doanh thu cao + hàng loại A = thưởng cao hơn'
              }
            },

            {
              cell: 'H2',
              requiredFormula: '=RANK(F2,$F$2:$F$5,0)',
              acceptableFormulas: [
                '=RANK(F2,$F$2:$F$5)'
              ],
              description: { en: 'Rank employee performance', vi: 'Xếp hạng nhân viên' },
              hint: {
                en: 'Use RANK to rank employees by revenue',
                vi: 'Dùng RANK để xếp hạng theo doanh thu'
              },
              explanation: {
                en: 'Higher revenue = higher rank (1 is best)',
                vi: 'Doanh thu càng cao thì hạng càng cao (1 là cao nhất)'
              }
            }
          ]
        }]
      },
    ],
    
    master: [
      {
        id: 'm1',
        title: {
          en: 'Dynamic Business Engine & Decision Model',
          vi: 'Mô hình quyết định & động cơ kinh doanh động'
        },
        description: {
          en: 'Master-level Excel: dynamic formulas, error-proof logic and scalable models',
          vi: 'Excel bậc thầy: công thức động, logic chống lỗi và mô hình mở rộng'
        },
        category: 'analysis',
        difficulty: 'master',
        estimatedTime: 90,
        prerequisites: ['e1'],
        content: {
          en: `
            <h3>Excel Master Skills</h3>
            <p>Skills required:</p>
            <p>• LET to optimize and simplify complex formulas</p>
            <p>• INDEX + MATCH + MATCH (2D lookup)</p>
            <p>• IFERROR for error-proof systems</p>
            <p>• SUMPRODUCT for conditional aggregation</p>
            <p>• Dynamic decision modeling</p>
          `,
          vi: `
            <h3>Kỹ năng Excel bậc thầy</h3>
            <p>Kỹ năng yêu cầu:</p>
            <p>• LET để tối ưu và làm gọn công thức phức tạp</p>
            <p>• INDEX + MATCH + MATCH (tra cứu 2 chiều)</p>
            <p>• IFERROR để xây dựng hệ thống chống lỗi</p>
            <p>• SUMPRODUCT cho tính toán có điều kiện</p>
            <p>• Tư duy mô hình quyết định động</p>
          `
        },

        exercises: [{
          description: {
            en: 'Build a dynamic profit & decision engine based on multi-dimension rules',
            vi: 'Xây dựng hệ thống lợi nhuận & quyết định theo nhiều chiều'
          },

          initialData: [
            {r:0,c:0,v:{v:'Order ID'}},{r:0,c:1,v:{v:'Product Type'}},{r:0,c:2,v:{v:'Region'}},
            {r:0,c:3,v:{v:'Quantity'}},{r:0,c:4,v:{v:'Profit'}},{r:0,c:5,v:{v:'Decision'}},
            {r:1,c:0,v:{v:'O01'}},{r:1,c:1,v:{v:'S'}},{r:1,c:2,v:{v:'North'}},{r:1,c:3,v:{v:120}},
            {r:2,c:0,v:{v:'O02'}},{r:2,c:1,v:{v:'M'}},{r:2,c:2,v:{v:'South'}},{r:2,c:3,v:{v:60}},
            {r:3,c:0,v:{v:'O03'}},{r:3,c:1,v:{v:'D'}},{r:3,c:2,v:{v:'North'}},{r:3,c:3,v:{v:200}},
            {r:4,c:0,v:{v:'O04'}},{r:4,c:1,v:{v:'N'}},{r:4,c:2,v:{v:'Central'}},{r:4,c:3,v:{v:90}},
            {r:6,c:1,v:{v:'North'}},{r:6,c:2,v:{v:'South'}},{r:6,c:3,v:{v:'Central'}},
            {r:7,c:0,v:{v:'S'}},{r:7,c:1,v:{v:40}},{r:7,c:2,v:{v:38}},{r:7,c:3,v:{v:39}},
            {r:8,c:0,v:{v:'M'}},{r:8,c:1,v:{v:25}},{r:8,c:2,v:{v:23}},{r:8,c:3,v:{v:24}},
            {r:9,c:0,v:{v:'D'}},{r:9,c:1,v:{v:35}},{r:9,c:2,v:{v:34}},{r:9,c:3,v:{v:36}},
            {r:10,c:0,v:{v:'N'}},{r:10,c:1,v:{v:15}},{r:10,c:2,v:{v:14}},{r:10,c:3,v:{v:15}},
            {r:12,c:0,v:{v:'Min Profit'}},{r:12,c:1,v:{v:3000}},
            {r:13,c:0,v:{v:'High Volume'}},{r:13,c:1,v:{v:150}}
          ],

          tasks: [
            {
              cell: 'E2',
              requiredFormula: '=LET(p,INDEX(B8:D11,MATCH(B2,A8:A11,0),MATCH(C2,B7:D7,0)),p*D2)',
              acceptableFormulas: [
                '=LET(price,INDEX($B$8:$D$11,MATCH(B2,$A$8:$A$11,0),MATCH(C2,$B$7:$D$7,0)),price*D2)'
              ],
              description: { en: 'Calculate dynamic profit', vi: 'Tính lợi nhuận động' },
              hint: {
                en: 'Use LET + INDEX + MATCH + MATCH for 2D lookup',
                vi: 'Dùng LET + INDEX + MATCH + MATCH tra 2 chiều'
              },
              explanation: {
                en: 'LET optimizes complex formulas',
                vi: 'LET giúp công thức rõ ràng và tối ưu hơn'
              }
            },

            {
              cell: 'F2',
              requiredFormula: '=IFERROR(IF(AND(E2>=$B$13,D2>=$B$14),"EXPAND",IF(E2>=$B$13,"KEEP","STOP")),"CHECK")',
              acceptableFormulas: [
                '=IFERROR(IF(AND(E2>=3000,D2>=150),"EXPAND",IF(E2>=3000,"KEEP","STOP")),"CHECK")'
              ],
              description: { en: 'Generate business decision', vi: 'Tạo quyết định kinh doanh' },
              hint: {
                en: 'Use IF + AND + IFERROR for decision engine',
                vi: 'Dùng IF + AND + IFERROR cho hệ thống quyết định'
              },
              explanation: {
                en: 'Model classifies actions based on profit & volume',
                vi: 'Mô hình phân loại quyết định dựa trên lợi nhuận & sản lượng'
              }
            }
          ]
        }]
      },
      {
        id: 'm2',
        title: {
          en: 'Operational Risk Scoring & Action Model',
          vi: 'Mô hình chấm điểm rủi ro & hành động vận hành'
        },
        description: {
          en: 'Master-level Excel: dynamic scoring, multi-criteria filtering and action logic',
          vi: 'Excel bậc thầy: chấm điểm động, lọc đa điều kiện và logic hành động'
        },
        category: 'analysis',
        difficulty: 'master',
        estimatedTime: 90,
        prerequisites: ['e1'],
        content: {
          en: `
            <h3>Excel Master Skills</h3>
            <p>Skills required:</p>
            <p>• XLOOKUP for modern dynamic lookup</p>
            <p>• FILTER for multi-condition data extraction</p>
            <p>• IFS for multi-level scoring logic</p>
            <p>• COUNTIFS for pattern detection</p>
            <p>• IFNA for robust error handling</p>
          `,
          vi: `
            <h3>Kỹ năng Excel bậc thầy</h3>
            <p>Kỹ năng yêu cầu:</p>
            <p>• XLOOKUP cho tra cứu hiện đại</p>
            <p>• FILTER để lọc dữ liệu đa điều kiện</p>
            <p>• IFS cho logic chấm điểm nhiều mức</p>
            <p>• COUNTIFS để phát hiện mẫu dữ liệu</p>
            <p>• IFNA để chống lỗi hệ thống</p>
          `
        },

        exercises: [{
          description: {
            en: 'Score operational risk and determine action strategy',
            vi: 'Chấm điểm rủi ro vận hành và xác định chiến lược hành động'
          },

          initialData: [
            // ===== BẢNG VẬN HÀNH =====
            {r:0,c:0,v:{v:'Case ID'}},{r:0,c:1,v:{v:'Department'}},{r:0,c:2,v:{v:'Delay Days'}},
            {r:0,c:3,v:{v:'Error Count'}},{r:0,c:4,v:{v:'Risk Score'}},{r:0,c:5,v:{v:'Action'}},

            {r:1,c:0,v:{v:'C01'}},{r:1,c:1,v:{v:'IT'}},{r:1,c:2,v:{v:2}},{r:1,c:3,v:{v:1}},
            {r:2,c:0,v:{v:'C02'}},{r:2,c:1,v:{v:'HR'}},{r:2,c:2,v:{v:8}},{r:2,c:3,v:{v:3}},
            {r:3,c:0,v:{v:'C03'}},{r:3,c:1,v:{v:'Finance'}},{r:3,c:2,v:{v:15}},{r:3,c:3,v:{v:4}},
            {r:4,c:0,v:{v:'C04'}},{r:4,c:1,v:{v:'IT'}},{r:4,c:2,v:{v:5}},{r:4,c:3,v:{v:0}},

            // ===== BẢNG NGƯỠNG RỦI RO =====
            {r:6,c:0,v:{v:'Condition'}},{r:6,c:1,v:{v:'Score'}},
            {r:7,c:0,v:{v:'Delay >= 10'}},{r:7,c:1,v:{v:5}},
            {r:8,c:0,v:{v:'Delay >= 5'}},{r:8,c:1,v:{v:3}},
            {r:9,c:0,v:{v:'Error >= 3'}},{r:9,c:1,v:{v:4}},
            {r:10,c:0,v:{v:'Error >= 1'}},{r:10,c:1,v:{v:2}}
          ],

          tasks: [

            {
              cell: 'E2',
              description: {
                en: 'Calculate operational risk score',
                vi: 'Tính điểm rủi ro vận hành'
              },
              requiredFormula: '=IFS(C2>=10,5,C2>=5,3,D2>=3,4,D2>=1,2,TRUE,0)',
              acceptableFormulas: [
                '=IFS($C2>=10,5,$C2>=5,3,$D2>=3,4,$D2>=1,2,TRUE,0)'
              ],
              hint: {
                vi: 'Ưu tiên chấm điểm theo Delay trước, nếu không đạt ngưỡng thì mới xét Error. Dùng IFS để đảm bảo chỉ trả về mức rủi ro cao nhất phù hợp.',
                en: 'Prioritize delay-based scoring first, then fallback to error-based rules using IFS.'
              },
              explanation: {
                vi: 'IFS giúp xây dựng thang điểm rủi ro theo thứ tự ưu tiên',
                en: 'IFS enables priority-based risk scoring'
              }
            },

            {
              cell: 'F2',
              description: {
                en: 'Determine action strategy',
                vi: 'Xác định chiến lược hành động'
              },
              requiredFormula: '=IFNA(CHOOSE(E2+1,"MONITOR","REVIEW","ESCALATE","CRITICAL","CRITICAL","CRITICAL"),"CHECK")',
              acceptableFormulas: [
                '=IFNA(CHOOSE($E2+1,"MONITOR","REVIEW","ESCALATE","CRITICAL","CRITICAL","CRITICAL"),"CHECK")'
              ],
              hint: {
                vi: 'Dùng Risk Score làm chỉ số điều hướng, ánh xạ trực tiếp sang hành động bằng CHOOSE và bọc IFNA để chống giá trị ngoài phạm vi.',
                en: 'Use Risk Score as a driver, map it to actions via CHOOSE and guard with IFNA.'
              },
              explanation: {
                vi: 'CHOOSE tạo bảng quyết định ẩn ngay trong công thức',
                en: 'CHOOSE acts as an embedded decision table'
              }
            }

          ]
        }]
      },

    ]
  }
};