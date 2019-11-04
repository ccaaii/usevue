<template>
    <div>
    	<app-nav :post="nav"></app-nav>
    	<div class="form">
    		<div class="form-group">
    			<label for="input1">被访者姓名:</label>
    			<input type="text" class="form-control" placeholder="请输入被访者姓名" />
    		</div>
    		<div class="form-group">
    			<label for="input2">被访者电话:</label>
    			<input type="number" class="form-control" placeholder="请输入被访者电话" />
    		</div>
    		<div class="form-group">
    			<label for="input3">访问时间段:</label>
    			<input type="text" class="form-control" placeholder="请输入访问时间段" />
    		</div>
    		<div class="form-group">
    			<label for="input4">姓名:</label>
    			<input type="text" class="form-control" placeholder="请输入您的姓名" />
    		</div>
    		<div class="form-group">
    			<label for="input5">人脸照片:</label>
    			<input type="text" class="form-control" placeholder="请上传您的人脸照片" />
    		</div>
    		<div class="form-group">
    			<label for="input6">随行人员姓名:</label>
    			<input type="text" class="form-control" placeholder="请输入您随行人员姓名" />
    		</div>
    		<div class="form-group">
    			<label for="input7">随行人员照片:</label>
    			<input type="text" class="form-control" placeholder="请上传您随行人员照片" />
    		</div>
    		<div class="form-group">
    			<label for="input8"></label>
    			<button class="form-control">提交预约</button>
    		</div>
    	</div>
    </div>
</template>

<script>
import AppNav from '@/utils/AppNav'
export default {
    components: {
        AppNav
    },
    data() {
        return {
        	nav:{
        		back: false,
        		title: '人脸识别通行管理系统'
        	}
        }
    }
}
</script>
<style>
.form{
	background: #fff;
	padding: 20px 3%;
}

.form .form-group{
	padding-bottom: 16px;
}

.form label{
	font-size: 14px;
	color: #666;
	padding-bottom: 8px;
	display: inline-block;
}

.form button{
	display: block;
	background: #4B8DF5;
	border: 0;
	height: 38px;
	line-height: 34px;
	color: #fff;
	width: 100%;
	text-align: center;
	font-size: 15px;
	border-radius: 3px;
}
</style>
