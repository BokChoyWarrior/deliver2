var globalsToAdd = {};
// add functions via
// globalsToAdd["functionName"] = function(arg1, arg2, ...) { ... };

globalsToAdd["quantityInBasket"] = function (item_id, user) {
    //Check for item in users basket.
    //Return Quantity of item in the basket.
    if (user) {
        var result = user.basket.find(x => x.item == item_id);
        if (result) {
            console.log("Found item " + item_id);
            return result.quantity;
        } else {
            return 0;
        }
    } else {
        //user not logged in, just return null
        return false;
    }
};

globalsToAdd["convertPrice"] = function (price) {
    var sPrice = price.toString();
    var length = sPrice.length;
    
    if (length <= 2) {
        return "£0." + sPrice;
    } else {
        sPrice = [sPrice.slice(0, length - 2), ".", sPrice.slice(length - 2)].join('');
        return "£" + sPrice;
    }
};

exports.globalsToAdd = globalsToAdd;