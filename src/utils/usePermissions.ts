import useUserStore from "../stores/user.store.ts";

export const usePermissions = () => {
    const user = useUserStore((state) => state.user);
    return {
        has(permission: string) {
            if (!user) return false;
            if (permission == 'filled'){
                return user.is_filled_by_user;
            }
            return user?.permissions.includes(permission);
        }
    }
}