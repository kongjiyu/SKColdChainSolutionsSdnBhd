"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { 
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  enableSelection?: boolean;
  onRowClick?: (row: TData) => void;
  onSelectionChange?: (selectedRows: TData[]) => void;
  hideToolbar?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  enableSelection = false,
  onRowClick,
  onSelectionChange,
  hideToolbar = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (tableContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 2); // 2px buffer
    }
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [data, columns]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const onSelectionChangeRef = React.useRef(onSelectionChange);
  
  React.useEffect(() => {
    onSelectionChangeRef.current = onSelectionChange;
  }, [onSelectionChange]);

  React.useEffect(() => {
    if (onSelectionChangeRef.current) {
        const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original);
        onSelectionChangeRef.current(selectedRows);
    }
    // Only trigger when rowSelection changes to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  const selectionColumn: ColumnDef<TData> = {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-slate-300 text-primary focus:ring-primary/20 transition-all cursor-pointer bg-white"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
            aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-slate-300 text-primary focus:ring-primary/20 transition-all cursor-pointer bg-white"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(!!e.target.checked)}
            aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const finalColumns = enableSelection ? [selectionColumn, ...columns] : columns;

  return (
    <div className="space-y-0">
      {!hideToolbar && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 bg-white border-b border-slate-200">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              placeholder={`Search...`}
              value={(table.getColumn(searchKey || "")?.getFilterValue() as string) ?? ""}
              onChange={(event) => {
                  table.setPagination({ pageIndex: 0, pageSize: table.getState().pagination.pageSize });
                  table.getColumn(searchKey || "")?.setFilterValue(event.target.value);
              }}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-400 font-bold text-slate-900"
            />
          </div>
        </div>
      )}

      <div className="relative group/table">
        <AnimatePresence>
          {canScrollRight && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10 flex items-center justify-end pr-2 md:hidden"
            >
              <div className="h-6 w-6 rounded-full bg-white/80 shadow-sm border border-slate-200 flex items-center justify-center animate-pulse">
                <ChevronRight className="h-4 w-4 text-primary" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div 
          ref={tableContainerRef}
          onScroll={checkScroll}
          className="overflow-x-auto scrollbar-hide"
        >
          <table className="w-full text-sm text-left border-separate border-spacing-0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {table.getAllColumns().map((column, idx) => {
                  const header = headerGroup.headers.find(h => h.column.id === column.id);
                  if (!header) return <th key={column.id} className="px-4 py-2.5" />;
                  
                  const isSorted = header.column.getIsSorted();
                  
                  return (
                    <th 
                      key={header.id} 
                      className={cn(
                          "px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-700 border-b border-slate-200 bg-slate-100/50 transition-colors",
                          idx === 0 && "pl-4 sm:pl-6",
                          idx === table.getAllColumns().length - 1 && "pr-4 sm:pr-6",
                          header.column.getCanSort() && "cursor-pointer hover:bg-slate-200/50"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1.5 justify-center sm:justify-start [&:has(>div.text-center)]:justify-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanSort() && (
                            <div className="flex flex-col text-slate-400">
                                {isSorted === "asc" ? <ChevronUp size={12} className="text-primary" /> : 
                                 isSorted === "desc" ? <ChevronDown size={12} className="text-primary" /> : 
                                 <div className="flex flex-col opacity-30">
                                    <ChevronUp size={10} className="-mb-1" />
                                    <ChevronDown size={10} />
                                 </div>
                                }
                            </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            <AnimatePresence>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => onRowClick?.(row.original)}
                    className={cn(
                      "hover:bg-slate-50/50 transition-all duration-100 cursor-pointer group",
                      row.getIsSelected() && "bg-primary/[0.02]"
                    )}
                  >
                    {row.getVisibleCells().map((cell, idx) => (
                      <td 
                          key={cell.id} 
                          className={cn(
                              "px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-[13px] text-slate-600 font-medium",
                              idx === 0 && "pl-4 sm:pl-6",
                              idx === row.getVisibleCells().length - 1 && "pr-4 sm:pr-6"
                          )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-40 text-center bg-white">
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <Search className="h-8 w-8 mb-2 opacity-10" />
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">No records found</p>
                    </div>
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 bg-white border-t border-slate-200 gap-4">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Showing <span className="text-slate-900">{table.getFilteredRowModel().rows.length}</span> Results
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm"
          >
            <ChevronLeft size={14} />
          </button>
          
          <div className="flex items-center gap-0.5 px-1">
            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
              .filter(page => {
                  const current = table.getState().pagination.pageIndex + 1;
                  return page === 1 || page === table.getPageCount() || (page >= current - 1 && page <= current + 1);
              })
              .map((page, i, arr) => (
                <React.Fragment key={page}>
                  {i > 0 && arr[i-1] !== page - 1 && <span className="text-slate-200 font-bold px-0.5">.</span>}
                  <button
                    onClick={() => table.setPageIndex(page - 1)}
                    className={cn(
                      "h-7 min-w-[28px] px-1.5 rounded-lg text-[10px] font-black transition-all",
                      table.getState().pagination.pageIndex + 1 === page
                        ? "bg-slate-900 text-white shadow-md z-10"
                        : "bg-white text-slate-400 hover:text-slate-900 hover:bg-slate-50 border border-slate-100"
                    )}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
          </div>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
