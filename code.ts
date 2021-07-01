
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
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  // Is there a more efficient way to do this with Promises? Would that be too complex for a beginner?
  await figma.loadFontAsync({ family: "SF Compact Display", style: "Bold" })
  await figma.loadFontAsync({ family: "SF Compact Display", style: "Medium" })
  await figma.loadFontAsync({ family: "SF Compact Display", style: "Regular" })

    
    const nodes: SceneNode[] = [];

     // pulling the main component
    const cardTemplate = figma.root.findOne(node => node.name == 'Tweet Card' && node.type == 'COMPONENT') as ComponentNode;
    // this looks like an error but I promise it works

    let newTweet = cardTemplate.createInstance();

    // Accessing by Array position to demonstrate the order in which child layers are listed
    const defaultName = (newTweet.children[1] as TextNode).characters;
    const defaultUsername = (newTweet.children[2] as TextNode).characters;
    const defaultTweet = (newTweet.children[3] as TextNode).characters;

    console.log(newTweet.children);

    //TODO: access the Name textnode and change it in the new instance
    if (newTweet.children[1].type !== "TEXT" && defaultName == "Name") {
      figma.closePlugin("unexpected child")
      return
    }
    (newTweet.children[1] as TextNode).characters = pluginMessage.name;

    //TODO: access the Username textnode and change it in the new instance
    if (newTweet.children[2].type !== "TEXT" && defaultName == "Username") {
      figma.closePlugin("unexpected child")
      return
    }
    (newTweet.children[2] as TextNode).characters = pluginMessage.username;

    //TODO: access the Tweet textnode and change it in the new instance
    if (newTweet.children[3].type !== "TEXT" && defaultName == "Tweet Content") {
      figma.closePlugin("unexpected child")
      return
    }
    (newTweet.children[3] as TextNode).characters = pluginMessage.tweet;

    
    //TODO: conditional to handle tweet card height based on # of characters
    //NTH: give the user an option to create a tweet with an image
    //NTH: current date/time or allow them to select their own
    //NTH: allow option to specify # of view, retweets, likes and comments 

    //TODO: create a function that filters through array of children to find the right page
    //TODO: append the new instance to the Tweets page

    nodes.push(newTweet);

      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
