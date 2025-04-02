import { create } from "zustand";
import { InteriorsService } from "../services/interiors.service";
import { InteriorProject } from "../types/interiors.types";

interface InteriorsState {
    projects: InteriorProject[];
    fetchProjects: () => Promise<void>;
    addProject: (project: InteriorProject, files: File[]) => Promise<void>;
    updateProject: (id: string, project: InteriorProject, files?: File[]) => Promise<void>;
    removeProject: (id: string) => Promise<void>;
}

export const useInteriorsStore = create<InteriorsState>((set) => ({
    projects: [],

    // 📌 Lấy danh sách dự án
    fetchProjects: async () => {
        const projects = await InteriorsService.getAll();
        set({ projects });
    },

    // ✅ Thêm dự án mới (truyền cả `project` và `files`)
    addProject: async (project, files) => {
        await InteriorsService.create(project, files);
        set((state) => ({ projects: [...state.projects, project] }));
    },

    // ✅ Cập nhật dự án (có thể cập nhật ảnh mới)
    updateProject: async (id, project, files) => {
        await InteriorsService.update(id, project, files);
        set((state) => ({
            projects: state.projects.map((p) => (p.id === id ? project : p)),
        }));
    },

    // ✅ Xóa dự án
    removeProject: async (id) => {
        await InteriorsService.delete(id);
        set((state) => ({ projects: state.projects.filter((p) => p.id !== id) }));
    },
}));
