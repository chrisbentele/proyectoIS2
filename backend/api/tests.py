from django.test import TestCase

# Create your tests here.
class URLTests(TestCase):
    def test_testprotectoindex(self):
        res = self.client.get("/api/proyecto/")
        self.assertEqual(res.status_code, 200)

    def test_testproyectonamed(self):
        res = self.client.get("/api/proyecto/1")
        self.assertEqual(res.status_code, 200)
