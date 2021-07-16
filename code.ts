
// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

figma.ui.resize(500,500);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async(pluginMessage) => {
  // One way of distinguishing between different types of messages sent froms
  // your HTML page is to use an object with a "type" property like this.

  // Is there a more efficient way to do this with Promises? Would that be too complex for a beginner?
  await figma.loadFontAsync({ family: "SF Compact Display", style: "Bold" })
  await figma.loadFontAsync({ family: "SF Compact Display", style: "Medium" })
  await figma.loadFontAsync({ family: "SF Compact Display", style: "Regular" })

    
    const nodes: SceneNode[] = [];

    // pull tweet component set
    let tweetComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "tweet") as ComponentSetNode;

     // pulling the default component (1st phase of plugin)
     // will need to write a conditional that builds specific tweet style based on user choice. maybe checkbox? pass over a value that matches the node name. 

     let defaultTweet = tweetComponentSet.defaultVariant as ComponentNode;

     let defaultDarkTweet = tweetComponentSet.findOne(node => node.name.indexOf("Images=none, Dark mode=true") > -1) as ComponentNode;


    // create an instance of the default tweet style
    let newTweet = defaultTweet.createInstance();

    // base component within the created tweet
    let baseTweetCard = newTweet.children[0] as ComponentNode;

    // default profile component in the created tweet
    let defaultProfile= baseTweetCard.findOne(node => node.name == "Profile" && node.type == "COMPONENT") as ComponentNode;
    
    let defaultName = defaultProfile.findOne(node => node.name == "firstLast" && node.type == "TEXT") as TextNode;

    let defaultUsername = defaultProfile.findOne(node => node.name == "username" && node.type == "TEXT") as TextNode;

    // default tweet content in the created tweet
    let defaultContent = baseTweetCard.findOne(node => node.name == "tweetContent" && node.type == "TEXT") as TextNode;

       // if finding these children by array position, how is that determined?

    console.log(newTweet.children);

    //TODO: access the Name textnode and change it in the new instance
    if ((defaultName.type !== "TEXT" && defaultName.name !== "firstLast") || 
        (defaultUsername.type !== "TEXT" && defaultUsername.name !== "username") ||
        (defaultContent.type !== "TEXT" && defaultContent.name !== "tweetContent")) 
        {
          figma.closePlugin("unexpected child")
          return
        }

    defaultName.characters = pluginMessage.name;
    defaultUsername.characters = pluginMessage.username;
    defaultContent.characters = pluginMessage.tweet;

  
    //NTH: give the user an option to create a tweet with an image
    //NTH: current date/time or allow them to select their own
    //NTH: allow option to specify # of view, retweets, likes and comments (random number generator)
    //NTH: include hashtags?

    //TODO: create a function that filters through array of children to find the right page
    //TODO: append the new instance to the Tweets page

    nodes.push(newTweet);

      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
