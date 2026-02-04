import React from 'react'

const Footer = ({completedTasksCount, activeTasksCount}) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className='text-center'>
          <p className='text-sm text-muted-foreground'>
            {
              completedTasksCount > 0 && (
                <>
                  Đù đỉnh, mày đã hoàn thành {completedTasksCount} việc
                  {
                    activeTasksCount > 0 && `, còn  ${activeTasksCount} việc nữa thôi, làm đi cu!`
                  }
                </>
              )
            }

            {completedTasksCount  === 0 && activeTasksCount > 0 && (
              <>
                Làm {activeTasksCount} việc đi con zai của bố 
              </>
            )}
          </p>
        </div>
      )}
    </>
  )
}

export default Footer