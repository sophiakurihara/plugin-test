// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(500, 500);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (pluginMessage) => __awaiter(this, void 0, void 0, function* () {
    // One way of distinguishing between different types of messages sent froms
    // your HTML page is to use an object with a "type" property like this.
    // Is there a more efficient way to do this with Promises? Would that be too complex for a beginner?
    yield figma.loadFontAsync({ family: "Inter", style: "Bold" });
    yield figma.loadFontAsync({ family: "Inter", style: "Medium" });
    yield figma.loadFontAsync({ family: "Inter", style: "Regular" });
    console.log(pluginMessage.darkModeState);
    const nodes = [];
    // pull tweet component set
    let tweetComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "tweet");
    // pulling the default component (1st phase of plugin)
    // will need to write a conditional that builds specific tweet style based on user choice. maybe checkbox? pass over a value that matches the node name. 
    let defaultTweet;
    // TODO: conditional to create specific tweet variant
    if (pluginMessage.darkModeState === true) {
        // not working???
        defaultTweet = tweetComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Images=none, Dark mode=true");
    }
    else {
        defaultTweet = tweetComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Images=none, Dark mode=false");
    }
    console.log(defaultTweet);
    // let defaultDarkTweet = tweetComponentSet.findOne(node => node.name.indexOf("Images=none, Dark mode=true") > -1) as ComponentNode;
    // create an instance of the default tweet style
    let newTweet = defaultTweet.createInstance();
    console.log(newTweet);
    // base component within the created tweet
    // let baseTweetCard = newTweet.children[0] as ComponentNode;
    // default profile component in the created tweet
    let defaultProfile = newTweet.findOne(node => node.name == "Profile");
    let defaultName = defaultProfile.findOne(node => node.name == "firstLast" && node.type == "TEXT");
    let defaultUsername = defaultProfile.findOne(node => node.name == "username" && node.type == "TEXT");
    // default tweet content in the created tweet
    let defaultContent = newTweet.findOne(node => node.name == "tweetContent" && node.type == "TEXT");
    // if finding these children by array position, how is index determined?
    console.log(defaultProfile);
    //TODO: access the Name textnode and change it in the new instance
    if ((defaultName.type !== "TEXT" && defaultName.name !== "firstLast") ||
        (defaultUsername.type !== "TEXT" && defaultUsername.name !== "username") ||
        (defaultContent.type !== "TEXT" && defaultContent.name !== "tweetContent")) {
        figma.closePlugin("unexpected child");
        return;
    }
    defaultName.characters = pluginMessage.name;
    defaultUsername.characters = pluginMessage.username;
    defaultContent.characters = pluginMessage.tweet;
    // TODO: Use JS dateTime function to get current date and time for tweet
    // TODO: Use random number generator for # of likes and retweets
    nodes.push(newTweet);
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
});
