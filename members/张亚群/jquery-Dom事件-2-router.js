app.get('/getMore',function (req,res) {

    var news = [
        {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥1099.00'

        }, {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥109.00'
        }, {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥10.00'
        },
        {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥1099.00'

        }, {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥109.00'
        }, {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥10.00'
        },{
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥1099.00'

        }, {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥109.00'
        }, {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥10.00'
        },
        {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥1099.00'

        }, {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥109.00'
        }, {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥10.00'
        },{
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥1099.00'

        }, {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥109.00'
        }, {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥10.00'
        },
        {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥1099.00'

        }, {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥109.00'
        }, {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '藏进相遇路路通猴子',
            price: '￥10.00'
        }
    ];
    var pageIndex = req.query.page;
    var len=3;
    var retNews = news.slice(pageIndex*len,pageIndex*len+len);
    res.send({
        status:0,
        data:retNews
    })
})