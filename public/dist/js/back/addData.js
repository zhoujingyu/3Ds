/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	function uploadPictureData() {
	    var path = $('#picPath').val();
	    var title = $('#picTitle').val();
	    var count = $('#picCount').val();
	    var type = $('#picType').val();
	    //if(!/^\/[\w.]+\/$/.test(path)){
	    //    console.warn("path格式错误");
	    //    return false;
	    //}else{
	    //    console.log("path格式正确")
	    //}
	    if (title == "") {
	        console.warn("请输入title");
	        return false;
	    } else {
	        console.log("title格式正确");
	    }
	    if (isNaN(count)) {
	        console.warn("请输入数字");
	        return false;
	    } else {
	        console.log("count正确");
	    }
	    if (type == "") {
	        console.warn("type错误");
	        return false;
	    }
	    $.ajax({
	        type: "get",
	        url: "/back/addPictureData",
	        data: {
	            path: path,
	            title: title,
	            count: count,
	            type: type
	        },
	        dataType: "JSON",
	        success: function success(data) {
	            alert(data.message);
	        },
	        error: function error() {
	            alert("网络错误，请重新提交");
	        }
	    });
	}

/***/ }
/******/ ]);