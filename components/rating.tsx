import { Icons } from "@/components/icons"

export const Rating = () => {
  return (
    <div className="flex flex-col px-3 py-2 mb-1">
      <div className="flex items-center justify-between space-y-3">
        <div className="flex items-center space-x-2">
          <Icons.thumbUp size={16} className="text-green-500" />
          <span className="text-sm">Let Const</span>
        </div>
        <p className="text-xs">16. May 2023</p>
      </div>
      <h3 className="my-1.5">The Northface Jacket</h3>
      <div className="flex items-center text-sm mb-2">
        <div className="flex flex-1 flex-col">
          <p className='text-foreground/75'>Description was correct:</p>
          <Icons.checkmark />
        </div>
        <div className="flex flex-1 flex-col">
          <p className='text-foreground/75'>Communication was smooth:</p>
          <Icons.close />
        </div>
        <div className="flex flex-1 flex-col">
          <p className='text-foreground/75'>Honored a promise:</p>
          <Icons.checkmark />
        </div>
      </div>
      <div className="bg-muted rounded-md p-3">
        <p className='text-xs'>This is the best seller!!!</p>
      </div>
    </div>
  )
}