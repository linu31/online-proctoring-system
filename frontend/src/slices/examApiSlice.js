import { apiSlice } from './apiSlice';

// ✅ Use a dedicated exams route instead of users
const EXAMS_URL = '/api/users';

export const examApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Get all exams
    getExams: builder.query({
      query: () => ({
        url: `${EXAMS_URL}`,
        method: 'GET',
        credentials: 'include', // send cookies/session
      }),
      providesTags: ['Exam'],

      // Safely handle backend responses
      transformResponse: (response) => {
        console.log("✅ Exams API raw response:", response);
        return response || [];
      },

      // Detailed error logging
      transformErrorResponse: (error) => {
        console.error("❌ Error fetching exams:", JSON.stringify(error, null, 2));
        return {
          status: error?.status || 500,
          message: error?.data?.message || error?.error || 'Failed to fetch exams'
        };
      },

      // Optional polling
      pollingInterval: 60000,
    }),

    // Create exam
    createExam: builder.mutation({
      query: (data) => ({
        url: `${EXAMS_URL}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Exam'],
    }),

    // Get questions by examId
    getQuestions: builder.query({
      query: (examId) => ({
        url: `${EXAMS_URL}/${examId}/questions`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Questions'],
    }),

    // Create question
    createQuestion: builder.mutation({
      query: (data) => ({
        url: `${EXAMS_URL}/questions`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Questions'],
    }),

    // Delete exam
    deleteExam: builder.mutation({
      query: (examId) => ({
        url: `${EXAMS_URL}/${examId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Exam'],
    }),
  }),
});

// ✅ Export hooks
export const {
  useGetExamsQuery,
  useCreateExamMutation,
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useDeleteExamMutation,
} = examApiSlice;
