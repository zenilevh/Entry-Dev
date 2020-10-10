$(document).ready(function() {
    getWithExpiry('panel-wrap');
    if (localStorage.length !== 0) {
        $(".panel-wrap").hide();
    }
    $("#notif-btn").click(function() {
        $(".notification").slideUp('slow');
    });

    $("#panel-btn").click(function() {
        $(".panel-wrap").slideUp('slow');
        setWithExpiry('panel-wrap', 5000)
    });
});

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
        // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
        //bandingin waktu, dan cek time
    if (now.getTime() > item.expiry) {
        // kalo expired di remove 
        // dan return null
        localStorage.removeItem(key)
        return null
    }
    return item.value
}

function setWithExpiry(key, ttl) {
    const now = new Date()
        // item isi nya data expiry time
        // dan total waktu nya
    const item = {
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
}