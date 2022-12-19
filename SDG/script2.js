var treeData = [
    {
      name: "GOAL 2",
      parent: "null",
      children: [
        {
          name: "Target 2.1",
          parent: "GOAL 2",
          children: [
            {
              name: "Target 2.1.1",
              parent: "Target 2.1",
            },
            {
              name: "Target 2.1.2",
              parent: "Target 2.1",
            },
          ],
        },
        {
          name: "Target 2.2",
          parent: "GOAL 2",
          children: [
            {
              name: "Target 2.2.1",
              parent: "2.2",
            },
            {
              name: "Target 2.2.2",
              parent: "Target 2.2",
            },
          ],
        },
        {
          name: "Target 2.3",
          parent: "GOAL 2",
          children: [
            {
              name: "Target 2.3.1",
              parent: "Target 2.3",
              children: [
                {
                  name: "Target 2.3.1.1",
                  parent: "Target 2.3.1",
                  children: [
                    {
                      name: "Target 2.3.1.1.1",
                      parent: "Target 2.3.1.1",
                    },
                    {
                      name: "Target 2.3.1.1.2",
                      parent: "Target 2.3.1.1",
                    },
                  ],
                },
                {
                  name: "Target 2.3.2",
                  parent: "Target 2.3",
                  children: [
                    {
                      name: "Target 2.3.2.1",
                      parent: "Target 2.3.2",
                    },
                    {
                      name: "Target 2.3.2.2",
                      parent: "Target 2.3.2",
                    },
                  ],
                },
              ],
            },
            {
              name: "Target 2.3.2",
              parent: "Target 2.3",
            },
          ],
        },
        {
          name: "Target 2.4",
          parent: "GOAL 2",
          children: [
            {
              name: "Target 2.4.1",
              parent: "Target 2.4",
            },
            {
              name: "Target 2.4.2",
              parent: "Target 2.4",
              children: [
                {
                  name: "Target 2.4.2.1",
                  parent: "Target 2.4.2",
                  children: [
                    {
                      name: "Target 2.4.2.1.1",
                      parent: "Target 2.4.2.1",
                    },
                    {
                      name: "Target 2.4.2.1.2",
                      parent: "Target 2.4.2.1",
                    },
                  ],
                },
                {
                  name: "Target 2.4.2.2",
                  parent: "Target 2.4.2",
                  children: [
                    {
                      name: "Target 2.4.2.2.1",
                      parent: "Target 2.4.2.2",
                    },
                    {
                      name: "Target 2.4.2.2.2",
                      parent: "Target 2.4.2.2",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Target 2.5",
          parent: "GOAL 2",
          children: [
            {
              name: "Target 2.5.1",
              parent: "Target 2.5",
            },
            {
              name: "Target 2.5.2",
              parent: "Target 2.5",
            },
          ],
        },
        {
          name: "Target 2.6",
          parent: "GOAL 2",
          children: [
            {
              name: "Target 2.6.1",
              parent: "Target 2.6",
            },
            {
              name: "Target 2.6.2",
              parent: "Target 2.6",
            },
          ],
        },
      ],
    },
  ];
  var margin = { top: 50, right: 120, bottom: 0, left: 200 },
    width = 960 - margin.right - margin.left,
    height = 700 - margin.top - margin.bottom;
  
  var i = 0,
    duration = 750,
    root;
  
  var tree = d3.layout.tree().size([height, width]);
  
  var diagonal = d3.svg.diagonal().projection(function (d) {
    return [d.y, d.x];
  });
  
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 1e-6);
  
  root = treeData[0];
  root.x0 = height / 2;
  root.y0 = 0;
  
  update(root);
  
  d3.select(self.frameElement).style("height", "500px");
  
  function update(source) {
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);
  
    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
      d.y = d.depth * 180;
    });
  
    // Update the nodes…
    var node = svg.selectAll("g.node").data(nodes, function (d) {
      return d.id || (d.id = ++i);
    });
  
    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .on("click", click);
  
    nodeEnter
      .append("circle")
      .attr("r", 1e-6)
      .on("mouseover", () => {
        div.transition().duration(300).style("opacity", 1);
      })
      .on("mousemove", (d) => {
        div
          .text(`${d.name}`)
          .style("left", `${d3.event.pageX}px`)
          .style("top", `${d3.event.pageY}px`);
      })
      .on("mouseout", () => {
        div.transition().duration(300).style("opacity", 1e-6);
      })
      .style("fill", function (d) {
        return d.children ? "goldenrod" : "goldenrod";
      });
  
    nodeEnter
      .append("text")
      .attr("x", function (d) {
        return d.children || d._children ? -20 : -20;
      })
      .attr("dy", ".35em")
      .attr("text-anchor", function (d) {
        return d.children || d._children ? "end" : "end";
      })
      .text(function (d) {
        return d.name;
      })
      .style("fill-opacity", 1e-6);
  
    // Transition nodes to their new position.
    var nodeUpdate = node
      .transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });
  
    nodeUpdate
      .select("circle")
      .attr("r", 10)
      .style("fill", function (d) {
        return d.children ? "goldenrod" : "goldenrod";
      });
  
    nodeUpdate.select("text").style("fill-opacity", 1);
  
    // Transition exiting nodes to the parent's new position.
    var nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();
  
    nodeExit.select("circle").attr("r", 1e-6);
  
    nodeExit.select("text").style("fill-opacity", 1e-6);
  
    // Update the links…
    var link = svg.selectAll("path.link").data(links, function (d) {
      return d.target.id;
    });
  
    // Enter any new links at the parent's previous position.
    link
      .enter()
      .insert("path", "g")
      .attr("class", "link")
      .attr("d", function (d) {
        var o = { x: source.x0, y: source.y0 };
        return diagonal({ source: o, target: o });
      });
  
    // Transition links to their new position.
    link.transition().duration(duration).attr("d", diagonal);
  
    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition()
      .duration(duration)
      .attr("d", function (d) {
        var o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
      })
      .remove();
  
    // Stash the old positions for transition.
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
  
  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }
  // $(function () {
  //   $('[data-toggle="tooltip"]').tooltip()
  // })
  
  