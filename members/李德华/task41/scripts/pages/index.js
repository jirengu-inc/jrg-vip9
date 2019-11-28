define(function(require) {
  require(['common/Carousel', 'common/FetchData', 'common/LazyLoad'], function(Carousel, FetchData) {
    $('.carousel').each(function() {
      new Carousel($(this), function(index) {
        var titleText;
        var subText;
        switch (index) {
          case 1:
            titleText = 'Tonight, We hunt';
            subText = 'I will be the best';
            break;
          case 2:
            titleText = "Let's Go";
            subText = "Welcome to the League of Draven";
            break;
          case 3:
            titleText = "Your will, my hands";
            subText = "Always trust your spirit";
            break;
          case 4:
            titleText = "A new moon is rising";
            subText = "My blade is at your service";
            break;
          default:

        }
        $('#header>.layout h1').animate({
          'opacity': 0
        },300, function() {
          $('#header>.layout h1').text(titleText);
          $('#header>.layout h1').animate({
            'opacity': 1
          }, 300);
        });
        $('#header>.layout p').animate({
          'opacity': 0
        },300, function() {
          $('#header>.layout p').text(subText);
          $('#header>.layout p').animate({
            'opacity': 1
          }, 300);
        });
      });
    })
    var index = 1;
    FetchData(index, function() {
      index++;
    });
    $('.more-btn').on('click', function(e) {
      e.preventDefault();
      FetchData(index,function() {
        index++;
      })
    })
  })
})
