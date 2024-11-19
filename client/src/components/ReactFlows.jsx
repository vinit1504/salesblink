import React, { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  ReactFlowProvider,
  Position,
  Handle,
  Controls,
  MiniMap,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import SourceBlockModal from "./SourceBlockModal";
import { useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";

const CustomNode = ({ data, id, onNodeClick, selectedLists }) => (
  <div
    className={`relative p-4 ${
      data.isLastNode ? "bg-transparent" : "bg-white border border-gray-300"
    } rounded-lg w-52 text-center`}
    onClick={() => onNodeClick(id)}
  >
    {data.isLastNode ? (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
          className="w-8 h-8 border-2 border-blue-400 text-blue-400 rounded flex items-center justify-center hover:bg-blue-50 transition-colors"
          onClick={data.onAdd}
        >
          <span className="text-xl leading-none">+</span>
        </button>
      </div>
    ) : (
      <>
        <Handle type="target" position={Position.Top} />
        <div className="relative mx-auto flex justify-center items-center">
          {id === "1" && selectedLists.length > 0 ? (
            <div className="flex items-center space-x-2">
              <FaUserPlus className="text-red-500" size={20} />
              <ul className="text-left">
                {selectedLists.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>{data.label}</div>
          )}
        </div>
        <Handle type="source" position={Position.Bottom} />
      </>
    )}
  </div>
);

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const edgePath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
  return (
    <g>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        strokeWidth={2}
        stroke="#B8C4CE"
        style={{ pointerEvents: "all" }}
      />
    </g>
  );
};

const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: {
      label: "+ Add Lead Source",
      isLastNode: false,
    },
    position: { x: 250, y: 50 },
  },
  {
    id: "2",
    type: "custom",
    data: {
      label: "Sequence Start Point",
      isLastNode: true,
      isStartPoint: true,
    },
    position: { x: 250, y: 170 },
  },
];

const initialEdges = [
  {
    id: "edge-1-2",
    source: "1",
    target: "2",
    type: "custom",
    animated: true,
  },
];

const SequenceFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedNodes, setClickedNodes] = useState({}); // Track node clicks
  const { selectedLists } = useSelector((state) => state.reactFlow);

  const addNode = useCallback(() => {
    setNodes((nds) => {
      const updatedNodes = nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isLastNode: false,
        },
      }));

      const lastNode = nds[nds.length - 1];
      const newNodePosition = {
        x: lastNode.position.x,
        y: lastNode.position.y + 120,
      };

      const newNode = {
        id: `node-${nds.length + 1}`,
        type: "custom",
        data: {
          label: `Step ${nds.length + 1}`,
          isLastNode: true,
          onAdd: addNode,
        },
        position: newNodePosition,
      };

      setEdges((eds) => [
        ...eds,
        {
          id: `edge-${lastNode.id}-${newNode.id}`,
          source: lastNode.id,
          target: newNode.id,
          type: "custom",
          animated: true,
        },
      ]);

      return [...updatedNodes, newNode];
    });
  }, [setNodes, setEdges]);

  const onNodeClick = (id) => {
    setClickedNodes((prevState) => {
      const updatedClickedNodes = {
        ...prevState,
        [id]: (prevState[id] || 0) + 1, // Increment click count
      };
  console.log(id , "Clicked nodes");
  
      // Trigger the alert on the second click
      if (id === "node-3" ) {
        alert("You clicked this node a second time!");
      }
  
      return updatedClickedNodes;
    });
  
    // Open the modal for Node 1
    if (id === "1") {
      setIsModalOpen(true);
    }
  
    console.log(id, 'ID'); // Display the clicked ID
  };
  

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onAdd: addNode,
        },
      }))
    );
  }, [addNode, setNodes]);

  const nodeTypes = {
    custom: (props) => (
      <CustomNode
        {...props}
        onNodeClick={onNodeClick}
        selectedLists={selectedLists}
      />
    ),
  };

  const edgeTypes = {
    custom: CustomEdge,
  };

  return (
    <div className="w-full h-96 bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        defaultEdgeOptions={{
          type: "custom",
        }}
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>

      {isModalOpen && (
        <SourceBlockModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const FlowWrapper = () => (
  <ReactFlowProvider>
    <SequenceFlow />
  </ReactFlowProvider>
);

export default FlowWrapper;
