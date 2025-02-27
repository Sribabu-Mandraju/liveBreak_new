'use client';

import { Drawer } from 'vaul';

export default function VaulDrawer({ title, open, onOpenChange, children }) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 " />
        <Drawer.Content className="bg-gray-100 dark:bg-gray-800 z-50 min-h-[50vh] max-h-[70vh] fixed bottom-0 left-0 right-0 outline-none">
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex p-2 flex-row dark:bg-gray-900 dark:text-white bg-white justify-between items-center">
              <h2 className="text-xl font-semibold">{title}</h2>
              <button
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 rounded-md"
              >
                X
              </button>
            </div>

            {/* Content */}
            <div className=" dark:text-gray-400">{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
