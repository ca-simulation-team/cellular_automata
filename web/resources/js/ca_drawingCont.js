zebra.ready(function() {
    // create canvas 400x700 pixels
    var canvas = new zebra.ui.zCanvas(400, 700);
 
    // fill canvas root panel with UI components
    canvas.root.setLayout(new zebra.layout.BorderLayout(8));
    canvas.root.add(zebra.layout.CENTER, new zebra.ui.TextArea(""));
    var txt = new zebra.ui.Button("Clean");
    canvas.root.add(zebra.layout.BOTTOM, txt);
});