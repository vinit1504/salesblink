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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import SourceBlockModal from "./SourceBlockModal";
import AddBlocksPopup from "./AddBlocksPopup";
import { useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { HiMail } from "react-icons/hi"; // Added email icon

const CustomNode = ({ data, id, onNodeClick, selectedLists , templateName}) => (
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
          ) : id === "3" ? ( // Check for third node
            <div className="flex items-center space-x-2">
              <HiMail className="text-blue-500" size={20} />
              email
              <span>{templateName}</span>
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
      isLastNode: false,
    },
    position: { x: 250, y: 170 },
  },
  {
    id: "3", // Added third node
    type: "custom",
    data: {
      label: "Cold Email",
      isLastNode: false,
    },
    position: { x: 250, y: 290 },
  },
  {
    id: "4", // This becomes the last node with plus button
    type: "custom",
    data: {
      label: "Add Next Step",
      isLastNode: true,
    },
    position: { x: 250, y: 450 },
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
  {
    id: "edge-2-3",
    source: "2",
    target: "3",
    type: "custom",
    animated: true,
  },
  {
    id: "edge-3-4",
    source: "3",
    target: "4",
    type: "custom",
    animated: true,
  },
];

const SequenceFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { selectedLists } = useSelector((state) => state.reactFlow);
  const { templateName } = useSelector((state) => state.emailList);

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
    console.log(id, "Node clicked");
    
    if (id === "1") {
      setIsModalOpen(true);
    } else if (id === "3") { // Changed to check for node "3"
      setIsPopupOpen(true);
    }
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
        templateName={templateName}
      />
    ),
  };

  return (
    <div className="w-full h-96 bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
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

      <AddBlocksPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

const FlowWrapper = () => (
  <ReactFlowProvider>
    <SequenceFlow />
  </ReactFlowProvider>
);

export default FlowWrapper;