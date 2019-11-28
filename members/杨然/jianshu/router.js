/**
 * 这里是接口范例，可根据需求进行修改
 * 可在当前项目文件夹下直接新建 html文件，向对应接口发送请求
 */


/**
 * 发送 GET 请求， 无参数
 * GET /hello
 * 返回响应数据
 */
app.get('/hello', function(req, res) {
	res.send({
		status: 0,
		msg: "hello 饥人谷"
	});
});


/**
 * 发送 GET 请求, 有参数
 * GET /user/100
 * query = { name: 'ruoyu', age: 28 }
 */
app.get('/user/:uid', function(req, res) {
	console.log(req.params.uid); //100
	console.log(req.query.name); // 'ruoyu'
	res.send({
		status: 1,
		errorMsg: "请先注册"
	});
});


/**
 * 发送 POST 请求， 有参数
 * POST /comment
 * query = { comment: "这是评论内容" }
 */
app.post('/comment', function(req, res) {
	console.log(req.body.comment); // "这是评论内容"
	res.send({
		status: 0,
		data: {
			cid: 100,
			comment: "这是评论内容"
		}
	});
});



/**
 * 页面路由，从模板渲染页面渲染页面, 
 * htttp://localhost:8080/user
 * 支持 ejs, jade 模板
 */
app.get('/user', function(req, res) {
	res.render('user.ejs', {
		username: '饥人谷'
	});
});















// angular-jianshu


app.get('/articles', function(req, res){
    var id = req.query.categoryId;
    var page = req.query.page;
    var data = {};  
 	var data1 = {
    "data": [
        {
            "articleId": 1,
            "authorId": 1,
            "title": "<h2>想要比同龄人更优秀，这3点你应该知道！</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 2,
            "authorId": 1,
            "title": "<h2>这种情况，不如先不要谈恋爱！</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 3,
            "authorId": 1,
            "title": "<h2>简书早报161013——《你总抱怨白水的味道而借口与啤酒交好》</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 4,
            "authorId": 1,
            "title": "<h2>心动清单法：别焦虑了，这样制定月度计划表，事半功倍！</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 5,
            "authorId": 1,
            "title": "<h2>我为什么要选择放弃</h2>",
            "content": null,
            "category": 1,
            "comments": []
        }

    ],
    "code": 100
}
    var data2 = {
    "data": [
        {
            "articleId": 1,
            "authorId": 1,
            "title": "<h2>列表一第二页列表一第二页列表一第二页列表一第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 2,
            "authorId": 1,
            "title": "<h2>列表一第二页列表一第二页列表一第二页列表一第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 3,
            "authorId": 1,
            "title": "<h2>列表一第二页列表一第二页列表一第二页列表一第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 4,
            "authorId": 1,
            "title": "<h2>列表一第二页列表一第二页列表一第二页列表一第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 5,
            "authorId": 1,
            "title": "<h2>列表一第二页列表一第二页列表一第二页列表一第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        }

    ],
    "code": 100
}
    var data3 = {
    "data": [
        {
            "articleId": 1,
            "authorId": 1,
            "title": "<h2>列表二第一页列表二第一页列表二第一页列表二第一页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 2,
            "authorId": 1,
            "title": "<h2>列表二第一页列表二第一页列表二第一页列表二第一页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 3,
            "authorId": 1,
            "title": "<h2>列表二第一页列表二第一页列表二第一页列表二第一页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 4,
            "authorId": 1,
            "title": "<h2>列表二第一页列表二第一页列表二第一页列表二第一页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 5,
            "authorId": 1,
            "title": "<h2>列表二第一页列表二第一页列表二第一页列表二第一页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        }

    ],
    "code": 100
}

    var data4 = {
    "data": [
        {
            "articleId": 1,
            "authorId": 1,
            "title": "<h2>列表二第二页列表二第二页列表二第二页列表二第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 2,
            "authorId": 1,
            "title": "<h2>列表二第二页列表二第二页列表二第二页列表二第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 3,
            "authorId": 1,
            "title": "<h2>列表二第二页列表二第二页列表二第二页列表二第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 4,
            "authorId": 1,
            "title": "<h2>列表二第二页列表二第二页列表二第二页列表二第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 5,
            "authorId": 1,
            "title": "<h2>列表二第二页列表二第二页列表二第二页列表二第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        }

    ],
    "code": 100
}


    var data5 = {
    "data": [
        {
            "articleId": 1,
            "authorId": 1,
            "title": "<h2>列表三第一页列表三第一页列表三第一页列表三第一页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 2,
            "authorId": 1,
            "title": "<h2>列表三第一页列表三第一页列表三第一页列表三第一页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 3,
            "authorId": 1,
            "title": "<h2>列表三第一页列表三第一页列表三第一页列表三第一页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 4,
            "authorId": 1,
            "title": "<h2>列表三第一页列表三第一页列表三第一页列表三第一页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 5,
            "authorId": 1,
            "title": "<h2>列表三第一页列表三第一页列表三第一页列表三第一页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        }

    ],
    "code": 100
}


    var data6 = {
    "data": [
        {
            "articleId": 1,
            "authorId": 1,
            "title": "<h2>列表三第二页列表三第二页列表三第二页列表三第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 2,
            "authorId": 1,
            "title": "<h2>列表三第二页列表三第二页列表三第二页列表三第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 3,
            "authorId": 1,
            "title": "<h2>列表三第二页列表三第二页列表三第二页列表三第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 4,
            "authorId": 1,
            "title": "<h2>列表三第二页列表三第二页列表三第二页列表三第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        },
        {
            "articleId": 5,
            "authorId": 1,
            "title": "<h2>列表三第二页列表三第二页列表三第二页列表三第二页</h2>",
            "content": null,
            "category": 1,
            "comments": []
        }

    ],
    "code": 100
  }
	// var categoryId = req.query.categoryId;
	// var page = req.query.page;

    if (id == 1 && page == 1) {
        data = data1
    } else if(id == 1 && page == 2) {
        data = data2
    } else if(id == 2 && page == 1) {
        data = data3
    } else if(id == 2 && page == 2) {
        data = data4
    } else if(id == 3 && page == 1) {
        data = data5
    } else if(id == 3 && page == 2) {
        data = data6
    } else {
        data = { data: [] }
    }

	res.send({
		data: data.data,
		code: data.code
	})
})








// 分类接口
app.get('/category', function(req, res){
    var data = {
        "data": [
                    {
                        "id": 1, 
                        "name": "JavaScript"
                    }, 
                    {
                        "id": 2, 
                        "name": "HTML5"
                    }, 
                    {
                        "id": 3, 
                        "name": "热门文章"
                    }
                ], 
                "code": 100
              }
    res.send({
        data: data.data,
        code: data.code
    })
})




//获取文章详情
app.get('/articleInfor', function(req, res){
    var data = {
        "data": [
            {
                 "id":1,
                 "title":"想要比同龄人更优秀，这3点你应该知道！",
                 "content":"多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。",
                 "category":1
            },
            {
                 "id":2,
                 "title":"这种情况，不如先不要谈恋爱！",
                 "content":"多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。",
                 "category":1
            },
            {
                 "id":3,
                 "title":"简书早报161013——《你总抱怨白水的味道而借口与啤酒交好》",
                 "content":"多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。",
                 "category":1
            },
            {
                 "id":4,
                 "title":"心动清单法：别焦虑了，这样制定月度计划表，事半功倍！",
                 "content":"多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。",
                 "category":1
            },
            {
                 "id":5,
                 "title":"我为什么要选择放弃",
                 "content":"多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。多数时候我像条奋力往上游的鱼，在茫茫大海里没有目标，没有依靠，前路弥漫纷扰，看不到头在哪儿。每天心里充斥着担忧和迷茫，向上不知道路在哪里，又不甘沉落，所以日子过的异常苦痛。",
                 "category":1
            },
          ],
        "code":"100"
        }

    var id = parseInt(req.query.articleId);
    var resArr = {};
    for (var i = 0; i < data.data.length; i++) {
        if (id === data.data[i].id) {

            resArr = data.data[i];
        }
    }

    res.send({
        data: resArr,
        code: data.code
    })
})







