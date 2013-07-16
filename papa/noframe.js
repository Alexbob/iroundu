(function () {
    try {
        top != self && location.host != "papa.me" && top.location.toString()
    } catch (e) {
        top.location = "http://papa.me"
    }
})();