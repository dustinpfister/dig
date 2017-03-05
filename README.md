# dig - testing branch

This is a branch I made to test some things out without making any changes to master


## bower_components removed from .gitignore

I have a copy of phaser stored in this branch. This was not called for, but it happened just for the hell of it.

## Problems with cdn.rawgit.com, and raw.githubusercontent.com

### redirecting from cdn.rawgit.com to raw.githubusercontent.com

For whatever the reason linking to an image on cdn.rawgit.com has started to redirect to raw.githubusercontent.com, which can result in 'cross-origin image' related error's. Which is to be expected as it is now a different domain.

click the link, it should go to cdn.rawgit.com, but goes to raw.githubusercontent.com
[https://cdn.rawgit.com/dustinpfister/dig/testing/img/loadingbar.png](https://cdn.rawgit.com/dustinpfister/dig/testing/img/loadingbar.png)


### getting blocked from cdn.rawgit.com 

Apparently you can [get blocked](https://twitter.com/rawgit/status/836744103190638592) from cdn.rawgit.com if you swarm to many get requests for unique images, like this user did.

rawgit link:
[https://cdn.rawgit.com/shadowfox87/YGOSeries9CardPics/master/100000000.png](https://cdn.rawgit.com/shadowfox87/YGOSeries9CardPics/master/100000000.png)

githubusercontent link:
[https://raw.githubusercontent.com/shadowfox87/YGOSeries9CardPics/master/100000000.png](https://raw.githubusercontent.com/shadowfox87/YGOSeries9CardPics/master/100000000.png)
