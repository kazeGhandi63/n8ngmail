import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

export const Sidebar = ({ className, children }) => {
  const { isOpen, setIsOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          'hidden md:flex md:flex-col md:w-72 md:h-screen transition-all duration-300 ease-in-out',
          className
        )}
      >
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={cn(
                'fixed top-0 left-0 h-full w-72 z-50 flex flex-col md:hidden',
                className
              )}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const SidebarTrigger = ({ className, children, ...props }) => {
  const { setIsOpen } = useSidebar();
  return (
    <button
      onClick={() => setIsOpen(true)}
      className={cn('md:hidden', className)}
      {...props}
    >
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      {children}
    </button>
  );
};

export const SidebarHeader = ({ className, children }) => (
  <div className={cn('flex-shrink-0', className)}>{children}</div>
);

export const SidebarContent = ({ className, children }) => (
  <div className={cn('flex-1 overflow-y-auto', className)}>{children}</div>
);

export const SidebarFooter = ({ className, children }) => (
  <div className={cn('flex-shrink-0', className)}>{children}</div>
);

export const SidebarGroup = ({ className, children }) => (
  <div className={cn('', className)}>{children}</div>
);

export const SidebarGroupLabel = ({ className, children }) => (
  <h3 className={cn('px-4 text-xs font-semibold uppercase text-gray-500 tracking-wider', className)}>
    {children}
  </h3>
);

export const SidebarGroupContent = ({ className, children }) => (
  <div className={cn('mt-2', className)}>{children}</div>
);

export const SidebarMenu = ({ children }) => (
  <nav className="flex flex-col">{children}</nav>
);

export const SidebarMenuItem = ({ children }) => (
  <div>{children}</div>
);

export const SidebarMenuButton = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? 'div' : 'button';
  return <Comp ref={ref} className={cn('w-full text-left', className)} {...props} />;
});