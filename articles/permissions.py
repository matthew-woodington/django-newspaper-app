from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user == obj.author:
            return True

        if request.method in ['PUT', 'PATCH']:
            if obj.status in ['PB', 'SM', 'AR']:
                if request.user.is_superuser:
                    return True
                else:
                    return False
            if obj.status in ['DR']:
                if request.user == obj.author:
                    return True
                else:
                    return False

        return False


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user.is_superuser:
            return True
        else:
            return False
