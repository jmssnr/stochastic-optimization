"use client";

import { useParentSize } from "@/hooks/use-parent-size";

const ResponsiveContainer = ({
  children,
}: {
  children: (size: { width: number; height: number }) => React.ReactNode;
}) => {
  const [ref, size] = useParentSize();
  return (
    <div ref={ref} className="h-full w-full">
      {size.width !== 0 && size.height !== 0 && children(size)}
    </div>
  );
};

export default ResponsiveContainer;
