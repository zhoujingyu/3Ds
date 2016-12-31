import Create3D from "../components/Create3D.js";

let id = $('title').text();

$.ajax({
    type: 'get',
    url: '/getPicById',
    data: {
        id: id
    },
    dataType: 'json',
    success: function (data) {
        console.log(data[0]);
        var c3D=new Create3D(data[0]);
        c3D.start()
    },
    error: function () {
        console.log('失败')
    }
});
