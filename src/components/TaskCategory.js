import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import './TaskCategory.css';

function TaskCategory() {
  const [category, setCategory] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [addingTaskCategory, setAddingTaskCategory] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [name, setName] = useState('')

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    if (storedCategories) {
      setCategories(storedCategories);
    }
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser.name) {
          setName(storedUser.name);
        }
  }, []);

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!category.trim()) return;
    if (editCategory) {
      const updatedCategories = categories.map((cat) =>
        cat === editCategory ? category : cat
      );
      const updatedTasks = tasks.map((task) =>
        task.category === editCategory ? { ...task, category } : task
      );
      setCategories(updatedCategories);
      setTasks(updatedTasks);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setEditCategory('');
    } else {
      const updatedCategories = [...categories, category];
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    }
    setCategory('');
  };

  const toggleCategory = (cat) => {
    setExpandedCategories(prevState => ({
      ...prevState,
      [cat]: !prevState[cat]
    }));
  };

  const handleEditCategory = (cat) => {
    setEditCategory(cat);
    setCategory(cat);
  };

  const handleDeleteCategory = (cat) => {
    const updatedCategories = categories.filter(c => c !== cat);
    const updatedTasks = tasks.filter(task => task.category !== cat);
    setCategories(updatedCategories);
    setTasks(updatedTasks);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim() || !addingTaskCategory) return;
    const updatedTasks = [...tasks, { category: addingTaskCategory, task: newTask }];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNewTask('');
    setAddingTaskCategory(null);
  };

  return (
    <div className="container">
      <h2>Categorias de {name} </h2>
      <form onSubmit={handleCategorySubmit} className="form">
        <div>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editCategory ? 'Salvar' : 'Adicionar'}</button>
      </form>
      <div>
        <h3>Categorias:</h3>
        <ul className="categories">
          {categories && categories.map((cat, index) => (
            <li key={index} className="category-item">
              <div className="category-name">{cat}</div>
              <div className="category-actions">
                <button onClick={() => handleEditCategory(cat)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => toggleCategory(cat)}>
                  {expandedCategories[cat] ? '▼' : '▶'}
                </button>
                <button onClick={() => handleDeleteCategory(cat)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button onClick={() => setAddingTaskCategory(cat)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              {expandedCategories[cat] && (
                <ul className="tasks">
                  {tasks.filter(task => task.category === cat).map((task, taskIndex) => (
                    <li key={taskIndex}>{task.task}</li>
                  ))}
                </ul>
              )}
              {addingTaskCategory === cat && (
                <form onSubmit={handleAddTask} className="form">
                  <div>
                    <label>Nova Tarefa:</label>
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit">Tarefa</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskCategory;
