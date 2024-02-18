from rest_framework.pagination import PageNumberPagination


class AdminPostPaginations(PageNumberPagination):
    page_size = 10



class BlogPaginations(PageNumberPagination):
    page_size = 4