$(function () {
    $('.link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('.link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 登录表单认证
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {

            if (value !== $('.reg-box input[name=password]').val().trim()) {
                return '两次密码输入不一致';
            }
        }
    })

    // 注册交互
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 });
                }
                layui.layer.msg(res.message, { icon: 6 });
                $('.link_login').click();
                $('#form_reg')[0].reset();
            }
        })
    })

    // 登录交互
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 });
                }
                layui.layer.msg(res.message, { icon: 6 });
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})