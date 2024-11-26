import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Table, Popconfirm, message } from 'antd';
import DiagramCanvas from './DiagramCanvas';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Dashboard = () => {
  const [diagrams, setDiagrams] = useState([]);
  const [activeDiagram, setActiveDiagram] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDiagrams();
  }, []);

  const fetchDiagrams = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${apiUrl}/api/diagrams`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDiagrams(data);
    } catch (error) {
      console.error('Error fetching diagrams:', error.message);
      message.error('Failed to fetch diagrams');
    } finally {
      setLoading(false);
    }
  };

  const deleteDiagram = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/api/diagrams/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Diagram deleted successfully');
      fetchDiagrams(); // Refresh diagrams list
    } catch (error) {
      console.error('Error deleting diagram:', error.message);
      message.error('Failed to delete diagram');
    }
  };

  const saveDiagram = async (diagramToSave) => {
    const token = localStorage.getItem('token');

    if (!diagramToSave) {
      alert('No diagram to save!');
      return;
    }

    const userId = JSON.parse(localStorage.getItem('user')).id; // Adjust this based on how you store user data

    const payload = {
      title: diagramToSave.title || 'Untitled Diagram',
      elements: diagramToSave.elements || [],
      userId,
    };

    try {
      if (diagramToSave._id) {
        // Update existing diagram
        const { data } = await axios.put(
          `${apiUrl}/api/diagrams/${diagramToSave._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        message.success('Diagram updated successfully');
      } else {
        // Create a new diagram
        const { data } = await axios.post(
          `${apiUrl}/api/diagrams`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setActiveDiagram(data); // Set the newly created diagram
        message.success('Diagram created successfully');
      }
      fetchDiagrams(); // Refresh diagrams list
    } catch (error) {
      console.error('Save Diagram Error:', error.response?.data || error.message);
      message.error('Failed to save the diagram');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => setActiveDiagram(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this diagram?"
            onConfirm={() => deleteDiagram(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setActiveDiagram({ title: 'New Diagram', elements: [] })}
      >
        Create New Diagram
      </Button>
      <Table
        dataSource={diagrams}
        columns={columns}
        rowKey="_id"
        loading={loading}
        style={{ marginTop: 20 }}
      />
      <Modal
        visible={!!activeDiagram}
        onCancel={() => setActiveDiagram(null)}
        footer={null}
        width={900}
      >
        {activeDiagram && (
          <DiagramCanvas
            diagram={activeDiagram}
            saveDiagram={saveDiagram}
          />
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
