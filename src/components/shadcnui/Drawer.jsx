'use client';
 
import { Drawer } from 'vaul';
 
export default function VaulDrawer({open , onOpenChange , title , content}) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      {/* <Drawer.Trigger>Open Drawer</Drawer.Trigger> */}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 dark:bg-gray-800  h-[80vh] fixed bottom-0 left-0 right-0 outline-none">
        <div className="flex flex-col ">
            <div className='flex p-2 flex-row dark:bg-gray-900 dark:text-white bg-white justify-between'>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <button onClick={() => onOpenChange(false)} className="px-4 py-2 rounded-md">X</button>


            </div>
            <div className='p-2 dark:text-gray-400'>
                {content}
            </div>
           
           
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}