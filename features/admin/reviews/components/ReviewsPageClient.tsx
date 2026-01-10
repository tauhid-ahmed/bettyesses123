"use client";

import { useState, useEffect, useTransition } from "react";
import { Star, Users } from "lucide-react";
import { toast } from "sonner";
import { ReviewStatsCard } from "./ReviewStatsCard";
import { ReviewCard } from "./ReviewCard";
import { getReviews } from "../actions/get-reviews";
import { getPublicReviews } from "../actions/get-public-reviews";
import { approveReview } from "../actions/approve-review";
import { deleteReview } from "../actions/delete-review";
import { Review, ReviewStats } from "../types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Helper components for Filters/Pagination directly in this file or imported if reused
// Copied/Adapted from original page for consistency
const Pagination = ({
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    onPageChange,
    onItemsPerPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (items: number) => void;
  }) => {
     const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
             if (currentPage <= 3) pages.push(1, 2, 3);
             else if (currentPage >= totalPages - 2) pages.push(totalPages - 2, totalPages - 1, totalPages);
             else pages.push(currentPage - 1, currentPage, currentPage + 1);
        }
        return pages;
    };
  
    return (
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Showing</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-2 py-1 border border-gray-200 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span>
            out of <span className="font-medium">{totalItems}</span>
          </span>
        </div>
  
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
            <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

interface ReviewsPageClientProps {
  initialStats: ReviewStats;
}

export default function ReviewsPageClient({ initialStats }: ReviewsPageClientProps) {
    const [stats, setStats] = useState(initialStats);
    
    // Recent Reviews State
    const [recentReviews, setRecentReviews] = useState<Review[]>([]);
    const [recentLoading, setRecentLoading] = useState(true);
    const [recentPage, setRecentPage] = useState(1);
    const [recentLimit, setRecentLimit] = useState(5);
    const [recentTotal, setRecentTotal] = useState(0);
    const [recentSearch, setRecentSearch] = useState("");
    const [recentRatingFilter, setRecentRatingFilter] = useState<number | null>(null);

    // Public Reviews State
    const [publicReviews, setPublicReviews] = useState<Review[]>([]);
    const [publicLoading, setPublicLoading] = useState(true);
    const [publicSearch, setPublicSearch] = useState("");
    
    // Delete Dialog State
    const [deleteId, setDeleteId] = useState<string | null>(null);
    
    const [isPending, startTransition] = useTransition();

    // Fetch Recent Reviews
    useEffect(() => {
        const fetchRecent = async () => {
            setRecentLoading(true);
            const res = await getReviews({
                page: recentPage,
                limit: recentLimit,
                search: recentSearch,
                rating: recentRatingFilter || undefined
            });
            if (res.success) {
                setRecentReviews(res.data);
                setRecentTotal(res.meta?.total || 0);
            }
            setRecentLoading(false);
        };
        fetchRecent();
    }, [recentPage, recentLimit, recentSearch, recentRatingFilter]);

    // Fetch Public Reviews
    useEffect(() => {
        const fetchPublic = async () => {
             setPublicLoading(true);
            const res = await getPublicReviews(publicSearch); // API doesn't seem to support pagination in user request example, assuming all or client side? Assuming all for now based on response
             if (res.success) {
                setPublicReviews(res.data);
            }
            setPublicLoading(false);
        };
        fetchPublic();
    }, [publicSearch]);


    const handleTogglePublic = async (id: string) => {
        startTransition(async () => {
            const res = await approveReview(id);
            if (res.success) {
                toast.success(res.message);
                
                // 1. Update Recent Reviews list locally to show it's now Public
                setRecentReviews(prev => prev.map(r => r.id === id ? { ...r, isPublic: true } : r));
                
                // 2. Fetch the updated Public Reviews list
                // This ensures the "auto-refetch" behavior the user requested
                const publicRes = await getPublicReviews(publicSearch);
                 if (publicRes.success) {
                     setPublicReviews(publicRes.data);
                 }

                 // 3. Update stats if logical
                 setStats(prev => ({ 
                     ...prev, 
                     publicReviews: prev.publicReviews + 1,
                     pendingReviews: Math.max(0, prev.pendingReviews - 1)
                 }));

            } else {
                toast.error(res.message);
            }
        });
    };

    const confirmDelete = async () => {
         if (!deleteId) return;
         
         const id = deleteId;
         setDeleteId(null); // Close modal immediately

         startTransition(async () => {
            const res = await deleteReview(id);
            if (res.success) {
                toast.success(res.message);
                setRecentReviews(prev => prev.filter(r => r.id !== id));
                setPublicReviews(prev => prev.filter(r => r.id !== id));
                 setStats(prev => ({ ...prev, totalReviews: Math.max(0, prev.totalReviews - 1) }));
            } else {
                 toast.error(res.message);
            }
         });
    };

    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
    }

    const totalPages = Math.ceil(recentTotal / recentLimit);

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-6">
        <ReviewStatsCard
          icon={Star}
          value={stats.averageRating ? stats.averageRating.toFixed(1) : "0.0"}
          label="Average Rating"
        />
        <ReviewStatsCard
          icon={Users}
          value={stats.totalReviews}
          label="Total Reviews"
        />
      </div>

      {/* Recent Reviews Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent reviews
          </h2>
          <div className="flex items-center gap-3">
             {/* Star Filter */}
             <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md">
                 <span className="text-sm font-medium">Filter by Star:</span>
                 <select 
                    value={recentRatingFilter || ""} 
                    onChange={(e) => setRecentRatingFilter(e.target.value ? Number(e.target.value) : null)}
                    className="bg-transparent border-none text-white focus:ring-0 cursor-pointer"
                 >
                    <option value="" className="text-black">All</option>
                    {[1,2,3,4,5].map(s => <option key={s} value={s} className="text-black">{s} Stars</option>)}
                 </select>
            </div>

             {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              value={recentSearch}
              onChange={(e) => setRecentSearch(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
            {recentLoading ? (
                <div className="text-center py-8 text-gray-500">Loading reviews...</div>
            ) : recentReviews.length > 0 ? (
                recentReviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        showActions={true}
                        onDelete={handleDeleteClick}
                        onTogglePublic={handleTogglePublic}
                        isProcessing={isPending}
                    />
                ))
            ) : (
                 <div className="text-center py-8 text-gray-500">No reviews found</div>
            )}
        </div>

        {!recentLoading && recentTotal > 0 && (
             <Pagination
             currentPage={recentPage}
             totalPages={totalPages}
             itemsPerPage={recentLimit}
             totalItems={recentTotal}
             onPageChange={setRecentPage}
             onItemsPerPageChange={setRecentLimit}
           />
        )}
      </div>

      {/* Public Reviews Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Public reviews
          </h2>
           <input
              type="text"
              placeholder="Search public reviews..."
              value={publicSearch}
              onChange={(e) => setPublicSearch(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div className="space-y-4">
             {publicLoading ? (
                <div className="text-center py-8 text-gray-500">Loading public reviews...</div>
            ) : publicReviews.length > 0 ? (
                 publicReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      showActions={false}
                      onDelete={handleDeleteClick}
                      isProcessing={isPending}
                    />
                  ))
            ) : (
                <div className="text-center py-8 text-gray-500">No public reviews found</div>
            )}
        </div>
        {/* Pagination for public reviews could be added if API supports it */}
      </div>

       <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
