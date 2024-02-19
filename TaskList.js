// TodoComponent.js
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import {
  addTask,
  deleteTask,
  completeTask,
  updateTask,
  editTask,
} from './redux/actions';

import checkIcon from './images/check1.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TodoComponent = ({
  tasks,
  addTask,
  deleteTask,
  completeTask,
  editTask,
}) => {
  const [newTask, setNewTask] = useState('');
  const [sortedTasks, setSortedTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  useEffect(() => {
    updateSortedTasks();
  }, [tasks]);

  const updateSortedTasks = () => {
    const sorted = [...tasks].sort((a, b) => a.name.localeCompare(b.name));
    setSortedTasks(sorted);
  };

  const handleAddTodo = () => {
    if (editingTodo) {
      editTask(editingTodo.id, newTask);
      setEditingTodo(null);
    } else {
      if (newTask != '') {
        addTask({id: tasks.length + 1, name: newTask, completed: false});
      }
    }
    setNewTask('');
  };

  const handleEditTodo = (id, name) => {
    setEditingTodo({id, name});
    setNewTask(name);
  };

  const handleDeleteTask = taskId => {
    deleteTask(taskId);
    setNewTask('');
    setEditedTask(null);
  };

  const handleCompleteTask = taskId => {
    completeTask(taskId);
    setNewTask('');
    setEditedTask(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.fontStyle1}>Total Tasks: {tasks.length}</Text>
      <Text style={styles.fontStyle2}>
        Completed Tasks: {tasks.filter(task => task.completed).length}
      </Text>
      <TextInput
        placeholder="Enter task name"
        value={newTask}
        onChangeText={text => setNewTask(text)}
        style={{fontSize: 17, color: 'white'}}
        placeholderTextColor={'white'}
      />
      <TouchableOpacity onPress={handleAddTodo} style={styles.toDoButton}>
        <Text style={{color: 'black', fontSize: 16}}>
          {editingTodo ? 'Update To-do task' : 'Add To-do Task'}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={sortedTasks}
        keyExtractor={task => task.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View>
            {item.completed == true ? (
              <>
                <View key={item.id} style={styles.flatListContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={checkIcon}
                      style={{height: 20, width: 20}}
                      resizeMode="contain"
                    />
                    <Text style={styles.fontStyle3}>{item.name}</Text>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={styles.flatListContainer1}>
                  <View style={{width: windowWidth * 0.31}}>
                    <Text style={{color: 'white', fontSize: 15}}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={styles.flatListContainer2}>
                    <TouchableOpacity
                      onPress={() => handleEditTodo(item.id, item.name)}
                      style={styles.editButton}>
                      <Text style={{color: 'white'}}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleCompleteTask(item.id)}
                      style={styles.completeButton}>
                      <Text style={{color: 'white'}}>Complete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteTask(item.id)}
                      style={styles.deleteButton}>
                      <Text style={{color: 'white'}}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    backgroundColor: '#344955',
  },
  fontStyle1: {color: 'white', fontSize: 20},

  fontStyle2: {color: 'white', fontSize: 20, marginTop: 10},
  fontStyle3: {
    textDecorationLine: 'line-through',
    fontSize: 15,
    color: 'white',
    marginLeft: 10,
  },
  toDoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#F9AA33',
    borderRadius: 5,
  },
  flatListContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
  },
  flatListContainer1: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
  },
  flatListContainer2: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  editButton: {
    height: 40,
    backgroundColor: '#4A6572',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 5,
  },
  completeButton: {
    height: 40,
    backgroundColor: '#4CBB17',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 5,
    marginLeft: 5,
  },
  deleteButton: {
    height: 40,
    backgroundColor: '#D2042D',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 5,
    marginLeft: 5,
  },
});

const mapStateToProps = state => ({
  tasks: state.tasks,
  storedData: state.storedData,
});

const mapDispatchToProps = {
  addTask,
  updateTask,
  deleteTask,
  editTask,
  completeTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoComponent);
