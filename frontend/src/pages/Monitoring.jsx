/* eslint-disable no-unused-vars */
import React, { useState , useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import axios from 'axios';

function MonitoringPage() {


  const [nodeArray, setNodeArray] = useState([]);

  const [linkArray, setLinkArray] = useState([]);

  const getArrays = async () => {
    const nodes =  await axios.get('http://localhost:5000/api/devices') 
    // console.log(nodes.data)
    setNodeArray(nodes.data);
    const links = await axios.get('http://localhost:5000/api/connections')
    // console.log(links.data)
    setLinkArray(links.data)

    
  }

  useEffect(() => {
    getArrays();
  }, []); 

  
  const data = {
    nodes: nodeArray
    ,
    links: linkArray
  };

  const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };
  
  const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  const onNodeHover = function(node) {
    document.body.style.cursor = node ? 'pointer' : null;
  }

  const onLinkHover = function(link) {
    document.body.style.cursor = link ? 'pointer' : null;
  }

  
  const CustomNode = (node, ctx, globalScale) => {
    const label = node.properties.name;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw node shape based on type
    if (node.labels == 'ROUTER') {
      // Draw circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI, false);
      ctx.fillStyle = (node.properties.status === 'up') ? 'blue' : 'red';
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.stroke();
    } else if (node.labels == 'SERVER') {
      // Draw square
      ctx.fillStyle = (node.properties.status === 'up') ? 'green' : 'red';
      ctx.fillRect(node.x - 15, node.y - 15, 30, 30);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(node.x - 15, node.y - 15, 30, 30);
    }

    // Draw labeldd
    ctx.fillStyle = 'white';
    ctx.fillText(label, node.x, node.y);
  }

  const CustomLink = (link, ctx, globalScale) => {
    const start = nodeArray.find(node => node.properties.name == link.start.properties.name);
    const end = nodeArray.find(node => node.properties.name == link.end.properties.name);

    // Calculate the offset for the link based on the node's size and shape
    const offsetX = end.x - start.x;
    const offsetY = end.y - start.y;
    const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    const radius = 10; // Assuming a radius of 10 for circular nodes

    const startX = start.x + (offsetX * radius) / distance;
    const startY = start.y + (offsetY * radius) / distance;
    const endX = end.x - (offsetX * radius) / distance;
    const endY = end.y - (offsetY * radius) / distance;


    // Determine the link color based on the relationship status
    
    let isConnected = link.segments[0].relationship.properties.status === 'connected'
                    && link.start.properties.status === 'up'
                    && link.end.properties.status === 'up';

    
    // Draw the link
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle =  (isConnected ) ? 'green' : 'red';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <ForceGraph2D
        graphData={data}
        nodeLabel="name"
        onNodeClick={onClickNode}
        onLinkClick={onClickLink}
        onNodeHover={onNodeHover}
        onLinkHover={onLinkHover}
        nodeCanvasObject={CustomNode}
        linkCanvasObject={CustomLink}
        linkDirectionalArrowLength={0} // Length of the arrowhead
        linkDirectionalArrowRelPos={0} // Position of the arrowhead (1 means at the end of the link)
        
      />
    </div>
  );        

}

export default MonitoringPage;