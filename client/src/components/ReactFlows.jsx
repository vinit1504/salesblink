import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  ConnectionLineType,
  Controls,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const PlusButton = ({ onClick, position }) => (
  <div
    onClick={onClick}
    style={{
      width: "20px",
      height: "20px",
      backgroundColor: "#4CAF50",
      color: "white",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      position: "absolute",
      zIndex: 10,
      top: position.y, // Set the position of the button relative to the edge end
      left: position.x,
    }}
  >
    +
  </div>
);

const initialNodes = [
  {
    id: "0",
    type: "input",
    data: { label: "Root Node" },
    position: { x: 0, y: 50 },
  },
  {
    id: "1",
    type: "default",
    data: {
      label: "Node 1",
      hasExtraEdge: true,
    },
    position: { x: 0, y: 150 },
  },
];

const initialEdges = [
  {
    id: "edge-0-1",
    source: "0",
    target: "1",
    type: "smoothstep",
    animated: true,
  },
];

let id = 2;
const getId = () => `${id++}`;
const nodeOrigin = [0.5, 0];

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [lastNodePosition, setLastNodePosition] = useState({ x: 0, y: 0 });

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) =>
        addEdge({ ...connection, type: "smoothstep", animated: true }, eds)
      );
    },
    [setEdges]
  );

  const addNode = (parentNodeId) => {
    const parentNode = nodes.find((node) => node.id === parentNodeId);

    if (parentNode) {
      const newNode = {
        id: getId(),
        type: "default",
        position: {
          x: parentNode.position.x,
          y: parentNode.position.y + 100,
        },
        data: { label: `Node ${id}` },
        origin: nodeOrigin,
      };

      // Add new node
      setNodes((nds) => [...nds, newNode]);

      // Create an edge from parent to new node
      const newEdge = {
        id: `edge-${parentNodeId}-${newNode.id}`,
        source: parentNodeId,
        target: newNode.id,
        type: "smoothstep",
        animated: true,
      };

      setEdges((eds) => [...eds, newEdge]);

      // Update last node position for button placement
      setLastNodePosition({ x: newNode.position.x + 100, y: newNode.position.y });
    }
  };

  const onConnectEnd = useCallback(
    (event) => {
      const { clientX, clientY } =
        event.type.includes("touch") ? event.changedTouches[0] : event;

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();

      if (reactFlowBounds) {
        const flowPosition = screenToFlowPosition({
          x: clientX - reactFlowBounds.left,
          y: clientY - reactFlowBounds.top,
        });

        const sourceNode = nodes.find(
          (node) =>
            node.id ===
            event.target.closest(".react-flow__node")?.getAttribute("data-id")
        );

        const newNode = {
          id: getId(),
          type: "default",
          position: sourceNode
            ? {
                x: sourceNode.position.x,
                y: sourceNode.position.y + 100,
              }
            : flowPosition,
          data: { label: `Node ${id}` },
          origin: nodeOrigin,
        };

        setNodes((nds) => [...nds, newNode]);
        setLastNodePosition({
          x: newNode.position.x + 100,
          y: newNode.position.y,
        });
      }
    },
    [screenToFlowPosition, setNodes, nodes]
  );

  useEffect(() => {
    // Update position of the last node when nodes change
    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      setLastNodePosition({ x: lastNode.position.x + 100, y: lastNode.position.y });
    }
  }, [nodes]);

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
        <button
          onClick={() => addNode("0")}
          style={{
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Node Under Root
        </button>
        <button
          onClick={() => addNode("1")}
          style={{
            padding: "5px 10px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Add Node Under Node 1
        </button>
      </div>
      <div ref={reactFlowWrapper} style={{ height: "100%", width: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          connectionLineType={ConnectionLineType.Smoothstep}
          fitView
          fitViewOptions={{ padding: 2 }}
          nodeOrigin={nodeOrigin}
        >
          <Background />
          <Controls />
          <MiniMap />
          {edges.length > 0 &&
            edges.map((edge) => {
              // Find the target node of the last edge
              if (edge.target === nodes[nodes.length - 1]?.id) {
                const targetNode = nodes.find((node) => node.id === edge.target);
                const edgeEnd = {
                  x: targetNode?.position.x + 100, // Offset for button position
                  y: targetNode?.position.y,
                };
                return (
                  <PlusButton
                    key={`plus-${edge.id}`}
                    onClick={() => addNode(edge.target)}
                    position={edgeEnd}
                  />
                );
              }
              return null;
            })}
        </ReactFlow>
      </div>
    </div>
  );
};

const FlowWrapper = () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);

export default FlowWrapper;
