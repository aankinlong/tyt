var vm = new Vue({
	el : '#tytUserApp',
	data : {
		dateTime : "aa",
		params : [

		],
		ischeckdate : [],// 获取选项框数据
		checkAll : false,// 全选
		totalItems : 0,
		pageSize : 10,
		pagination : {
			currentPage : 1
		},
		maxSize : 0,
		q : {
			key : "",
			searchBy : ""
		},
	      WarehourseTypeName: {
	            '0': '安卓',
	            '1': '苹果',
	        	'2': '游客',
	    		'3': 'pc'
	        },
		showItem : "list",
		title : null,
		userId : null,
		userLevel : null,
		userDay : null,
		tytUser : {},
		username : null,
		password : null,
		rePass:null,
		daynum:null,
		depname:null,
		note:null,
	},
	// 启动监听
	watch : {
		'ischeckdate' : function() {
			if (this.params.length == this.ischeckdate.length) {
				this.checkAll = true;
			} else {
				this.checkAll = false;
			}
		},
	},
	methods : {
		checkedAll : function() {
			var ischeckdate = [];// 新建勾选框
			// 根据勾选框判断
			if (this.checkAll) {
				//
				this.params.forEach(function(item) {
					ischeckdate.push(item.id);
				});
			}
			this.ischeckdate = ischeckdate;
		},
		pageNum : function() {
			paging(true);
		},
		pageChanged : function() {
			paging(false);
		},
		query : function() {
			vm.reload();
		},
		add : function() {
			vm.showItem = "addUser";
			vm.title = "新增";
			vm.tytUser = {};
		},
		update : function(id) {

			if (id == null) {
				return;
			}

			$.get("../sys/tytUser/info/" + id, function(r) {
				vm.showItem = "password";
				vm.title = "修改";
				vm.tytUser = r.tytUser;
				vm.tytUser.password = null;
			});
		},
		change : function(id) {
			vm.userId = id;
			vm.showItem = "level";
		},
		changeUser : function() {
			this.userLevel = this.$refs.refuserLevel.value;
			this.userDay = this.$refs.refuserDay.value;
//			if (this.userLevel == "") {
//				alert("等级不能为空");
//				return;
//			}
//			if (this.userLevel.match(/^(\d{1}[0-9])/))  
//			{  
//				alert("等级只能输入0-9");
//				return; 
//			}
//			if (this.userDay == "") {
//				alert("天数不能为空");
//				return;
//			}
//			if (!this.userDay.match("^\\d+$"))  
//			{  
//				alert("天数请输入正整数");
//				return; 
//			} 
			$.ajax({
				type : "POST",
				url : "../sys/tytUser/changeUser",
				data : {
					"userId" : vm.userId,
					"userDay" : vm.userDay,
					"userLevel" : vm.userLevel,
					"depname" : vm.depname,
					"note" : vm.note,
				},
				contentType : "application/x-www-form-urlencoded",
				dataType : 'json',
				success : function(r) {
					if (r.code == 0) {
						alert('操作成功', function(index) {
							vm.reload();
						});
					} else {
						alert(r.msg);
					}
				}
			});
		},
		del : function(id) {

			if (id == null) {
				return;
			}

			confirm('确定要删除选中的记录？', function() {
				$.ajax({
					type : "POST",
					url : "../sys/tytUser/delete",
					data : {
						"id" : id
					},
					contentType : "application/x-www-form-urlencoded",
					dataType : 'json',
					success : function(r) {
						if (r.code == 0) {
							alert('操作成功', function(index) {
								vm.reload();
							});
						} else {
							alert(r.msg);
						}
					}
				});
			});
		},
		dels : function(id) {
		  var ids = "";
		  $(".qrcode-box input[type='checkbox']:checked"/* 判断是否选中 */).each(
			 function(index, item) {
						// 添加数据
						ids += $(item).val() + ",";// 每个数后面加个点，这样好区分
			});
		  if (ids == null || ids=="") {
			  alert('请选择一条数据')
			return;
		  }
			confirm('确定要删除选中的记录？', function() {
				$.ajax({
					type : "POST",
					url : "../sys/tytUser/delete",
					data : {
						"id" : ids
					},
					contentType : "application/x-www-form-urlencoded",
					dataType : 'json',
					success : function(r) {
						if (r.code == 0) {
							alert('操作成功', function(index) {
								vm.reload();
							});
						} else {
							alert(r.msg);
						}
					}
				});
			});
		},
		saveOrUpdate : function(event) {
			var url = "../sys/tytUser/save";
			$.ajax({
				type : "POST",
				url : url,
				data : JSON.stringify(vm.tytUser),
				success : function(r) {
					if (r.code === 0) {
						alert('操作成功', function(index) {
							vm.reload();
						});
					} else {
						alert(r.msg);
					}
				}
			});
		},
		saveOrAdd : function(event) {
			var url = "../sys/tytUser/saveadd";
			this.username = this.$refs.input1.value;
			this.password = this.$refs.input2.value;
			this.rePass = this.$refs.input3.value;
			this.depname = this.$refs.input4.value;
			this.daynum = this.$refs.input5.value;
			if (this.username == "") {
				alert("用户名不能为空");
				return;
			}
			if (this.password == null || this.password == '') {
				alert("密码不能为空");
				return;
			}
			if (this.password != this.rePass) {
				alert("两次密码不一致");
				return;
			}
			if (this.depname == "") {
				alert("部门不能为空");
				return;
			}
			if (this.daynum == "") {
				alert("时长不能为空");
				return;
			}
			if (!this.daynum.match("^\\d+$"))  
			{  
				alert("天数请输入正整数");
				return; 
			} 
			$.ajax({
				type : "POST",
				url : url,
				data : JSON.stringify(vm.tytUser),
				success : function(r) {
					if (r.code === 0) {
						alert('操作成功', function(index) {
							vm.reload();
						});
					} else {
						alert(r.msg);
					}
				}
			});
		},

		reload : function(event) {
			vm.showItem = "list";
			paging(true);
		}
	}
});

function paging(syc) {
	var index;
	$.ajax({
		type : "POST",
		url : "../sys/tytUser/list",
		contentType : "application/x-www-form-urlencoded",
		dataType : 'json',
		async : syc,
		data : {
			"pageNumber" : vm.pagination.currentPage,
			"pageSize" : vm.pageSize,
			"searchBy" : vm.q.searchBy,
			"keyword" : vm.q.keyword
		},
		beforeSend : function() {
			index = layer.load(1);
		},
		complete : function(data) {
			layer.close(index);
		},
		success : function(r) {
			vm.pageSize = r.page.pageSize;
			vm.pagination.currentPage = r.page.pageNumber;
			vm.params = r.page.result;
			for (var i = 0; i < vm.params.length; i++) {
				var data;
				if (vm.params[i].merchants == null) {
					var data = "";
				} else {
					var data = vm.params[i].merchants.receivablesUserName;
				}
				vm.params[i].receivablesUserName = data;
			}
			vm.totalItems = r.page.totalCount;
		}
	});
}

$().ready(function() {
	paging(true);
});