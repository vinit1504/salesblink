/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import { HiMail } from "react-icons/hi";
import Time from "./Time";

import { FaClock } from "react-icons/fa"; // Import clock icon
import Email2Followup from "./Email2Followup";

const CustomNode = ({
  data,
  id,
  onNodeClick,
  selectedLists,
  templateName,
  waitDuration,
  waitType,
  emailTemplate,
  sendEmailAs
}) => (
  <div
    className={`relative p-4 ${data.isLastNode ? "bg-transparent" : "bg-white border border-gray-300"
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
          ) : id === "3" ? (
            <div className="flex items-center space-x-2">
              <HiMail className="text-blue-500" size={20} />
              <span className="text-sm font-medium text-gray-700">
                {templateName || "Email Template"}
              </span>
            </div>
          ) : id === "node-4" ? (
            <div className="flex flex-row gap-3 items-center space-y-1">
              <FaClock className="text-gray-500 w-5 h-5" />{" "}
              {/* Fixed icon size */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Delay</span>
                <div className="text-sm font-medium text-gray-700">
                  {waitDuration} {waitType}
                </div>
              </div>
            </div>
          ) : id === "node-5" ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2">
                <HiMail className="text-blue-500" size={20} />
                <span className="text-sm font-medium text-gray-700">
                  {emailTemplate || "Email Template"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  Send Email As
                </span>
                {/* Display the sendEmailAs value */}
                <span className="text-sm text-gray-700">
                  {sendEmailAs || "Not Provided"}
                </span>
              </div>
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

const SequenceFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [isPopupOpen3, setIsPopupOpen3] = useState(false);
  const { selectedLists } = useSelector((state) => state.reactFlow);
  const { templateName } = useSelector((state) => state.emailList);
  const { waitDuration } = useSelector((state) => state.time);
  const { waitType } = useSelector((state) => state.time);
  const { emailTemplate } = useSelector((state) => state.emailFollowus);
  const { sendEmailAs } = useSelector((state) => state.emailFollowus);

  // Load nodes and edges from localStorage on page load
  useEffect(() => {
    const savedNodes = localStorage.getItem("nodes");
    const savedEdges = localStorage.getItem("edges");

    if (savedNodes && savedEdges) {
      setNodes(JSON.parse(savedNodes));
      setEdges(JSON.parse(savedEdges));
    } else {
      // Initial data if nothing is stored in localStorage
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
          id: "3",
          type: "custom",
          data: {
            label: "Add Next Step",
            isLastNode: true,
          },
          position: { x: 250, y: 290 },
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
      ];

      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, []);

  // Save nodes and edges to localStorage when they change
  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      localStorage.setItem("nodes", JSON.stringify(nodes));
      localStorage.setItem("edges", JSON.stringify(edges));
    }
  }, [nodes, edges]);

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

      // Get the new node number
      const nodeNumber = nds.length + 1;

      // Set label based on node number
      let label;
      if (nodeNumber === 3) {
        label = "Email Template";
      } else {
        label = `Step ${nodeNumber}`;
      }

      const newNode = {
        id: `node-${nodeNumber}`,
        type: "custom",
        data: {
          label: label,
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
    } else if (id === "3") {
      setIsPopupOpen(true);
    } else if (id === "node-4") {
      setIsPopupOpen2(true);
    } else if (id === "node-5") {
      setIsPopupOpen3(true);
    }
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, onAdd: addNode },
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
        waitDuration={waitDuration}
        waitType={waitType}
        sendEmailAs={sendEmailAs}
        emailTemplate={emailTemplate}
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
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>

      {isModalOpen && <SourceBlockModal onClose={() => setIsModalOpen(false)} />}
      <AddBlocksPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      <Time isOpen={isPopupOpen2} onClose={() => setIsPopupOpen2(false)} />
      <Email2Followup isOpen={isPopupOpen3} onClose={() => setIsPopupOpen3(false)} />
    </div>
  );
};

const FlowWrapper = () => (
  <ReactFlowProvider>
    <SequenceFlow />
  </ReactFlowProvider>
);

export default FlowWrapper;
