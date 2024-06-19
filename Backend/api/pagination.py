from rest_framework.pagination import PageNumberPagination


class AdminPostPaginations(PageNumberPagination):
    page_size = 10

class AdminBookPaginations(PageNumberPagination):
    page_size = 10



class BlogPaginations(PageNumberPagination):
    page_size = 12

class SearchPagination(PageNumberPagination):
    page_size = 12