$(document).ready(function () {
    $("input#txtCustomerCode").focus();
    setEvent();
    loadData(1);
    initEvents();
})


function initEvents() {
    //Validate các ô bắt buộc nhập
    $('input[required]').blur(function () {
        // Kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo
        var value = $(this).val();
        if (!value) {
            $(this).addClass('border-red');
            $(this).attr('title', "Trường này không được bỏ trống.");
            //alert("Trường này không được bỏ trống.");
            $(this).attr('validate', false);
        } else {
            $(this).removeClass('border-red');
            $(this).attr('validate', true);
        }
    });

    $('input#txtEmail').blur(function () {
        var value = $(this).val();
        var testEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!testEmail.test(value)) {
            $(this).addClass('border-red');
            $(this).attr('title', "Email không đúng định dạng.");
            $(this).attr('validate', false);
        } else {
            $(this).removeClass('border-red');
            $(this).attr('validate', true);
        }
    })
}
var formMode = null;
var employeeIdSelected = null;

/** ---------------------------
 * Gán sự kiện cho các Element
 * CreatedBy: NHT(06/04/2021)
 */

function setEvent() {

    $(document).on('click', '.dialog-close-button', function () {
        $('#dlgCustomerDetail').addClass('dialog-hide');
    })

    /*$('.checked').click(function () {
        $('.checked').prop('checked', true);
    })*/

    /*$("input").on("click", function () {
        $('.checked').prop('checked', true);
    });*/

    //var employeeId = $('#tblListCustomer tbody tr.bg-selected-row').data('recordId');

    //Xóa nhân viên
    $(document).on('click', '.btn-trash', function () {
        var values = [];
        $(document).ready(function () {
            $('#tblListCustomer tbody tr input:checked').each(function () {
                //values.push($(this).parent().parent().data('recordId'));
                values.push($('#tblListCustomer tbody tr').data('recordId'));
            });
            debugger
            if (values.length == 0) {
                alert("Bạn chưa chọn bất kì nhân viên nào.");
            }
            else {
                confirm("Bạn có chắc chắn muốn xóa Khách hàng khỏi hệ thống?");
                $.each(values, function (index, value) {
                    $.ajax({
                        method: "DELETE",
                        url: "http://api.manhnv.net/v1/employees/" + value
                    }).done(function () {
                        alert("Xóa thành công!");
                        loadData();
                    }).fail(function (res) {
                        alert("Không thể xóa khách hàng này, vui lòng kiểm tra lại..");
                    })
                })
            }
        });
        
    })
    /*$(document).on('click', '.btn-trash', function () {
        // Lấy khóa chính của bản ghi nhân viên vừa chọn:
        var employeeId = $('#tblListCustomer tbody tr.bg-selected-row').data('recordId');
       
        // Hiển thị cảnh báo cho người dùng:
        var result = confirm("Bạn có chắc chắn muốn xóa Khách hàng khỏi hệ thống?");
        if(result){
            $.ajax({
                method: "DELETE",
                url: "http://api.manhnv.net/v1/employees/" + employeeId
            }).done(function(){
                alert("Xóa thành công!");
                loadData();
            }).fail(function(res){
                alert("Không thể xóa khách hàng này, vui lòng kiểm tra lại..");
            })
        }
        // Thực hiện xóa nếu khách hàng xác nhận (Nhấn đồng ý xóa):
    })


    $(document).on('click', '#tblListCustomer tbody tr', function () {
        // Xóa tất cả các dòng đã có bg xác định trạng thái dòng được chọn
        $(this).siblings('.bg-selected-row').removeClass('bg-selected-row');
        // thay bg cho dòng vừa chọn:
        $(this).addClass('bg-selected-row');
    })*/

    //Nhấn đúp chuột vào dòng dữ liệu trên table thì hiển thị Form thông tin chi tiết:
    $('#tblListCustomer').on('dblclick', 'tbody tr', rowOnDblClick);

    //Nhấn chọn button Thêm khách hàng
    $('#btnAdd').click(function () {
        formMode = 1;
        $('.dialog input').val(null);
        $('#txtCustomerCode').val(getNewEmployeeId);
        $('.dialog select').val(null);
        $('#dlgCustomerDetail').removeClass('dialog-hide');
    })

    $('#btnSave').click(
        btnSaveOnClick
    );

    searchInfo();
}

function getNewEmployeeId() {
    var newestEmployee = "";
    // Lấy thông tin chi tiết khách hàng:
    $.ajax({
        method: "GET",
        url: "http://api.manhnv.net/v1/Employees/NewEmployeeCode",
        data: null,
        async: null,
        contentType :"application/json"
    }).done(function (res) {
        // Bindding dữ liệu lên Mã nhân viên:
        newestEmployee = res;
    }).fail(function (res) {
        alert(res.responseText);
    })
    return newestEmployee;
}
/** -------------------------------------
 * Nhấn đúp chuột vào bản ghi trên table
 * CreatedBy: NHT (06/04/2021)
 */
function rowOnDblClick(){
    formMode = 2;
    // Lấy Id của bản ghi:
    var employeeId = $(this).data('recordId');

    employeeIdSelected = employeeId;

    // Lấy thông tin chi tiết khách hàng:
    $.ajax({
        method: "GET",
        url: "http://api.manhnv.net/v1/employees/"+ employeeId
    }).done(function(res){
        // Bindding dữ liệu lên form chi tiết:
        var employee = res;
        $('#txtCustomerCode').val(employee.EmployeeCode);
        $('#txtFullName').val(employee.FullName);
        $('#dtDateOfBirth').val(employee.DateOfBirth);
        $('#cbGender').val(employee.Gender);
        $('#txtIdentify').val(employee.IdentityNumber);
        $('#dateStart').val(employee.IdentityDate);
        $('#addres').val(employee.IdentityPlace);
        $('#txtPhoneNumber').val(employee.PhoneNumber);
        $('#txtEmail').val(employee.Email);
        $('#position').val(employee.PositionName);
        $('#department').val(employee.DepartmentName);
        $('#baseOfSalary').val(employee.PositionName);
    }).fail(function(res){
        alert(res.responseText);
    })
    // Hiển thị form chi tiết:
    $('#dlgCustomerDetail').removeClass('dialog-hide');
}


/** ---------------------------
 * Sự kiện khi nhấn button Cất
 * CreatedBy: NVMANH (22/03/2021)
 */
function btnSaveOnClick() {
    //validate dữ liệu
    var inputValidates = $('input[required], input#txtEmail');
    $.each(inputValidates, function (index, input) {
        //.trigger(): Thực hiện tất cả các xử lý và đính kèm các loại sự kiện nhất định tới thành phần được chọn.
        $(input).trigger('blur');
    })
    var inputNotValids = $('input[validate="false"]');
    if (inputNotValids && inputNotValids.length > 0) {
        alert("Dữ liệu không hợp lệ, vui lòng kiểm tra lại");
        inputNotValids[0].focus();
        return;
    }


    // Thu thập dữ liệu ở các input (input, select...)
    var employeeCode = $('#txtCustomerCode').val();
    var fullName = $('#txtFullName').val();
    var dateOfBirth = $('#dtDateOfBirth').val();
    var gender = $('#cbGender').val();
    var identify = $('#txtIdentify').val();
    var identifyDate = $('#dateStart').val();
    var identifyPlace = $('#addres').val();
    var phone = $('#txtPhoneNumber').val();
    var email = $('#txtEmail').val();
    var positionName = $('#position').val();
    var departmentName = $('#department').val();
    var salary = $('#baseOfSalary').val();
    // Build thành object:
    var employees = {
        "EmployeeCode": employeeCode,
        "FullName": fullName,
        "DateOfBirth": dateOfBirth,
        "Gender": gender,
        "Email": email,
        "PhoneNumber": phone,
        "IdentityNumber": identify,
        "IdentityDate": identifyDate,
        "IdentityPlace": identifyPlace,
        "Salary": salary,
        "DepartmentName": departmentName,
        "PositionName": positionName,
    }

    /*var customer = {
        "CustomerCode": "12344321",
        "FullName": "abc",
        "Gender": null,
        "DateOfBirth": null,
        "Email": 'abc@',
        "PhoneNumber": "875433",
        "CustomerGroupId": "19165ed7-212e-21c4-0428-030d4265475f"
    }*/
    var method =  "POST";
    var url = "http://api.manhnv.net/v1/employees";

    if (formMode == 2) {
        employees.EmployeeId = employeeIdSelected;
        method =  "PUT";
        url = "http://api.manhnv.net/v1/employees/" + employeeIdSelected;
    }

    debugger;
    // Gọi service POST để thực hiện cất dữ liệu:
    $.ajax({
        method: method,
        url: url,
        data: JSON.stringify(employees),
        contentType:'application/json'
    }).done(function(res){
        if(formMode == 1){
            alert('Thêm mới thành công!');
        }else{
            alert('Sửa thành công!');
        }
        $('#dlgCustomerDetail').addClass('dialog-hide');
        // load lại dữ liệu
        loadData();

    }).fail(function(res){
        console.log(res);
        alert(res.responseText);
    })
}

/**
 * Thực hiện binding dữ liệu lên form
 * @param {object} customer
 * CreatedBy NVMANH (22/03/2021) 
 */
/*function bindingDetailData(customer){
    
}*/
/**
 * Load dữ liệu khách hàng
 * */
function loadData() {
    $('#tblListCustomer tbody').empty();
    // lấy dữ liệu từ Api về;
    var data = getData();
    console.table(data);
    buildDataTableHTML(data);
}

/**
 * Hàm thực hiện lấy dữ liệu
 * */
function getData() {
    var employees = null;
    $.ajax({
        method: "GET",
        url: "http://api.manhnv.net/v1/employees",
        data: null,
        async: false,
        contentType: "application/json"
    }).done(function (response) {
        employees = response;
    }).fail(function (response) {
        alert("Không thể lấy dữ liệu từ Api");
    })
    return employees;
}

/**
 * Thực hiện build bảng dữ liệu tương ứng với dữ liệu lấy từ Api
 * @param {Array} data mảng dữ liệu
 * CreatedBy: NHT
 */
function buildDataTableHTML(data) {
    //$('table#tblListCustomer tbody').html('');
    $.each(data, function (index, employee) {
        var dateOfBirth = employee.DateOfBirth;
        debugger;
        var dateFormat = formatDateDDMMYYYY(dateOfBirth);
        // Xử lý dữ liệu ngày tháng (Hiển thị dạng ngày/tháng/năm - nếu có):
        var debitAmout = Math.floor(Math.random() * 100000000);
        var salary = employee.Salary;
        var salary = formatMoney(salary);
        var trHTML = $(`<tr>
                        <td>${employee.EmployeeCode}</td>
                        <td>${employee.FullName}</td>
                        <td>${employee.GenderName}</td>
                        <td>${dateFormat}</td>
                        <td>${employee.PhoneNumber}</td>
                        <td>${employee.Email}</td>
                        <td>${employee.PositionName}</td>
                        <td>${employee.DepartmentName}</td>
                        <td>${employee.IdentityNumber}</td>
                        <td>${employee.IdentityPlace}</td>
                        <td>${salary}</td>
                        <td><input class="checked" type="checkbox"/></td>
                    </tr>`);
        debugger;
        trHTML.data('recordId', employee.EmployeeId);
        trHTML.data('record', employee);
        $('table#tblListCustomer tbody').append(trHTML);
    })
}

function searchInfo() {
    var check_dep = 0;
    var check_pos = 0;
    $('.input-search').on('keyup', function (event) {
        event.preventDefault();
        /* Act on the event */
        var tukhoa = $(this).val();
        $('#tblListCustomer tbody tr').filter(function () {
            $(this).toggle($(this).text().indexOf(tukhoa) > -1);
        });
    });

    $(".select-department").change(function () {
        //process($(this).children(":selected").html());
        var filter = $(".select-department").find(':selected').val();
        if (filter == "Tất cả phòng ban") loadData();
        else {
            $('#tblListCustomer tbody tr').filter(function () {
                $(this).toggle($(this).text().indexOf(filter) > -1);
            });
        }

        /*if (filter == "") this.url = "http://api.manhnv.net/api/Department";
        else {
            this.url = "http://api.manhnv.net/api/Department/?filter=" + filter;
        }
        loadData();
        this.url = "http://api.manhnv.net/api/Department";*/
    });

    /*$(".select-position").change(function () {
        //process($(this).children(":selected").html());
        var filter_pos = $(".select-position").find(':selected').val();
        if (filter_pos == "Tất cả vị trí") loadData();
        else {
            $('#tblListCustomer tbody tr').filter(function () {
                $(this).toggle($(this).text().indexOf(filter_pos) > -1);
            });
        }
    });*/
}
function filterDepartment() {
    
}   

/**
 * Xử lý khi truyền ngày tháng vào sẽ trả về chuỗi string có dạng ngày/tháng/năm
 * @param {Date} date mảng dữ liệu
 * CreatedBy: NVMANH (17/03/2021)
 */
function formatDateDDMMYYYY(date) {
    if (!date) {
        return "";
    }
    var newDate = new Date(date);
    var dateString = newDate.getDate();
    var monthString = newDate.getMonth() + 1;
    var year = newDate.getFullYear();
    return `${dateString}/${monthString}/${year}`;
}


/**
 * Xử lý hiển thị tiền tệ - cách 1
 * @param {Number} money Số tiền dạng decimal
 * CreatedBy: NVMANH (17/03/2021)
 */
function formatMoney(money) {
    var moneyFormat = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + " VND";;
    return moneyFormat;
}

/**
 * Xử lý hiển thị tiền tệ - cách 2
 * @param {Number} money Số tiền dạng decimal
 * CreatedBy: NVMANH (17/03/2021)
 */
/*function formatMoney(money) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0
    })
    if (money) {
        return formatter.format(money) // "$1,000.00"
    }
    return "";
}
*/