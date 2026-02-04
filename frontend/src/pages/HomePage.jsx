import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import api from '@/lib/axios'
import { visibleTaskLimit } from '@/lib/data'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


const HomePage = () => {

  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState('today');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery])

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery])

  //Logic lấy danh sách nhiệm vụ từ backend
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);

      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
      console.log(res.data.tasks);

    } catch (error) {
      console.error("Lỗi xảy ra khi truy suất tasks: ", error);
      toast.error("Lỗi khi truy xuất tasks.");
    }
  }

  //Biến lưu danh sách nhiệm vụ đã lọc
  const filteredTasks = taskBuffer.filter((task) => {
    switch(filter) {
       case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true; //Giữ nguyên k lọc gì hết
    }
  })
  
  const handleTaskChanged = () => {
    fetchTasks();
  }

   const handleNext = () => {
      if(page < totalPages) {
        setPage( (prev) => prev + 1)
      }
   }

   const handlePrev = () => {
      if(page > 1) {
        setPage( (prev) => prev - 1); 
      }
   }

   const handlePageChange = (newPage) => {
      setPage(newPage);
   }

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );
  
  if(visibleTasks.length === 0) {
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (

    <div className="min-h-screen w-full bg-white relative">
      {/* Dual Gradient Overlay (Bottom) Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 100%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 100% 80%, rgba(59,130,246,0.3), transparent)
      `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      {/* Your Content/Components */}
      <div className='container pt-8 mx-auto relative z-10'>
        <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>

          {/*Đầu trang */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* Thống kê và bộ lọc */}
          <StatsAndFilters 
          filter={filter}
          setFilter={setFilter}
            activeTasksCount={activeTaskCount} 
            completedTaskCount={completedTaskCount}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList 
          filteredTasks={visibleTasks} 
          filter={filter}
          handleTaskChanged={handleTaskChanged}
          />

          {/* Phân trang và lọc theo ngày */}
          <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <TaskListPagination 
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange }
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter 
            dateQuery={dateQuery} 
            setDateQuery={setDateQuery}
            />
          </div>

          {/* Chân trang */}
          <Footer 
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />

        </div>
      </div>
    </div>



  )
}

export default HomePage