import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from "/components/ui/card";
import { Button } from "/components/ui/button";
import { Check, Plus, X, ArrowRight, Clock, Heart, Home, List, Utensils } from "lucide-react";

// Sample data
const motivationalQuotes = [
  "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean is the Pirate King!",
  "When do you think people die? When they are shot through the heart? No. When they are ravaged by an incurable disease? No. It's when they are forgotten!",
  "If you don't take risks, you can't create a future!"
];

const sampleTasks = [
  { id: 1, text: "Finish project proposal", completed: false, priority: "high" },
  { id: 2, text: "Go for a run", completed: true, priority: "medium" },
  { id: 3, text: "Read 30 pages", completed: false, priority: "low" }
];

const sampleMeals = {
  breakfast: { name: "Oatmeal with fruits", calories: 350, protein: 10 },
  lunch: { name: "Grilled chicken salad", calories: 450, protein: 35 },
  dinner: { name: "Salmon with veggies", calories: 500, protein: 40 },
  snacks: { name: "Greek yogurt", calories: 150, protein: 12 }
};

export default function PersonalAIAssistant() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState(sampleTasks);
  const [newTask, setNewTask] = useState('');
  const [quote, setQuote] = useState(motivationalQuotes[0]);
  const [meals, setMeals] = useState(sampleMeals);
  const [showAddTask, setShowAddTask] = useState(false);

  // Rotate quotes every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setQuote(motivationalQuotes[randomIndex]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: "medium"
      }]);
      setNewTask('');
      setShowAddTask(false);
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateTotalNutrition = () => {
    return {
      calories: Object.values(meals).reduce((sum, meal) => sum + meal.calories, 0),
      protein: Object.values(meals).reduce((sum, meal) => sum + meal.protein, 0)
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-red-50 p-4 md:p-8 pb-20 md:pb-8">
      {/* Header */}
      <header className="mb-6 md:mb-8 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-red-600 mb-1 md:mb-2">Gomu Gomu Assistant</h1>
        <p className="text-sm md:text-lg text-blue-800">Your One Piece productivity sidekick</p>
      </header>

      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center mb-8 bg-white rounded-full shadow-md p-1 max-w-md mx-auto">
        <Button 
          variant={activeTab === 'dashboard' ? 'default' : 'ghost'} 
          onClick={() => setActiveTab('dashboard')}
          className="rounded-full"
        >
          Dashboard
        </Button>
        <Button 
          variant={activeTab === 'tasks' ? 'default' : 'ghost'} 
          onClick={() => setActiveTab('tasks')}
          className="rounded-full"
        >
          To-Do List
        </Button>
        <Button 
          variant={activeTab === 'meals' ? 'default' : 'ghost'} 
          onClick={() => setActiveTab('meals')}
          className="rounded-full"
        >
          Meal Planner
        </Button>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-4 md:space-y-6">
            {/* Motivational Quote */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-yellow-800 flex items-center text-base md:text-xl">
                  <Heart className="mr-2 text-red-500 w-4 h-4 md:w-5 md:h-5" /> Luffy's Wisdom
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <blockquote className="text-sm md:text-xl italic font-medium text-center text-yellow-900">
                  "{quote}"
                </blockquote>
              </CardContent>
            </Card>

            {/* Today's Tasks */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center text-base md:text-xl">
                  <Clock className="mr-2 text-blue-500 w-4 h-4 md:w-5 md:h-5" /> Today's Tasks
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">Complete these to become the Pirate King!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 p-4 md:p-6 pt-0">
                {tasks.filter(t => !t.completed).slice(0, 3).map(task => (
                  <div key={task.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                    <button 
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 mr-2 md:mr-3 flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                    >
                      {task.completed && <Check className="w-3 h-3 md:w-4 md:h-4" />}
                    </button>
                    <span className="flex-grow text-sm md:text-base">{task.text}</span>
                    <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${getPriorityColor(task.priority)}`}></span>
                  </div>
                ))}
                {tasks.filter(t => !t.completed).length === 0 && (
                  <p className="text-center text-gray-500 py-2 md:py-4 text-sm md:text-base">No tasks left! You're amazing!</p>
                )}
              </CardContent>
              <CardFooter className="justify-center p-4 md:p-6 pt-0">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('tasks')}
                  className="flex items-center text-xs md:text-sm"
                >
                  View All Tasks <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Goals Progress */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-xl">Current Goals</CardTitle>
                <CardDescription className="text-xs md:text-sm">Your journey to greatness</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2 md:gap-4 p-4 md:p-6 pt-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 md:border-8 border-blue-200 flex items-center justify-center mb-1 md:mb-2">
                    <span className="text-sm md:text-xl font-bold text-blue-600">75%</span>
                  </div>
                  <span className="text-xs md:text-sm">Fitness</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 md:border-8 border-red-200 flex items-center justify-center mb-1 md:mb-2">
                    <span className="text-sm md:text-xl font-bold text-red-600">50%</span>
                  </div>
                  <span className="text-xs md:text-sm">Learning</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center px-1 md:px-0">
              <h2 className="text-xl md:text-2xl font-bold">To-Do List</h2>
              <Button 
                onClick={() => setShowAddTask(!showAddTask)}
                size="sm"
                className="text-xs md:text-sm"
              >
                <Plus className="mr-1 h-3 w-3 md:h-4 md:w-4" /> Add Task
              </Button>
            </div>

            {showAddTask && (
              <Card className="mb-3 md:mb-4">
                <CardContent className="p-4 md:p-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="What needs to be done?"
                      className="flex-grow p-2 border rounded text-sm md:text-base"
                    />
                    <Button 
                      onClick={addTask}
                      size="sm"
                      className="text-xs md:text-sm"
                    >
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-2 md:p-6 space-y-1 md:space-y-3">
                {tasks.length === 0 ? (
                  <p className="text-center text-gray-500 py-3 md:py-4 text-sm md:text-base">No tasks yet! Add some to get started.</p>
                ) : (
                  tasks.map(task => (
                    <div key={task.id} className="flex items-center p-2 hover:bg-gray-50 rounded group">
                      <button 
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 mr-2 md:mr-3 flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                      >
                        {task.completed && <Check className="w-3 h-3 md:w-4 md:h-4" />}
                      </button>
                      <span className={`flex-grow text-sm md:text-base ${task.completed ? 'line-through text-gray-400' : ''}`}>
                        {task.text}
                      </span>
                      <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${getPriorityColor(task.priority)} mr-2 md:mr-3`}></span>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                      >
                        <X className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'meals' && (
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl font-bold">Meal Planner</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {Object.entries(meals).map(([mealType, meal]) => (
                <Card key={mealType} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-3 md:p-4">
                    <CardTitle className="capitalize text-base md:text-lg">
                      {mealType}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 md:p-4 pt-0">
                    <div className="flex items-start">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16 mr-3 md:mr-4" />
                      <div>
                        <p className="font-medium text-sm md:text-base">{meal.name}</p>
                        <p className="text-xs md:text-sm text-gray-600">{meal.calories} kcal • {meal.protein}g protein</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 md:p-4 pt-0">
                    <Button variant="outline" className="w-full text-xs md:text-sm">
                      Edit Meal
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="p-3 md:p-4">
                <CardTitle className="text-blue-800 text-base md:text-lg">
                  Daily Nutrition Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-4 pt-0">
                <div className="flex justify-between">
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-blue-600">{calculateTotalNutrition().calories}</p>
                    <p className="text-xs md:text-sm text-blue-800">Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-blue-600">{calculateTotalNutrition().protein}g</p>
                    <p className="text-xs md:text-sm text-blue-800">Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-blue-600">5</p>
                    <p className="text-xs md:text-sm text-blue-800">Veggies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden">
        <div className="flex justify-around p-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg ${activeTab === 'dashboard' ? 'text-red-600 bg-red-50' : 'text-gray-600'}`}
          >
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg ${activeTab === 'tasks' ? 'text-red-600 bg-red-50' : 'text-gray-600'}`}
          >
            <List className="h-5 w-5 mb-1" />
            <span className="text-xs">Tasks</span>
          </button>
          <button 
            onClick={() => setActiveTab('meals')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg ${activeTab === 'meals' ? 'text-red-600 bg-red-50' : 'text-gray-600'}`}
          >
            <Utensils className="h-5 w-5 mb-1" />
            <span className="text-xs">Meals</span>
          </button>
        </div>
      </div>
    </div>
  );
}
Share
Refresh
