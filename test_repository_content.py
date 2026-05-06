import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parent


class RepositoryContentTests(unittest.TestCase):
    def test_readme_contains_legal_use_notice(self):
        text = (ROOT / "README.md").read_text(encoding="utf-8")
        self.assertIn("仅用于下载自己拥有权利、获得授权或平台允许下载的内容", text)
        self.assertIn("用户自行承担使用本工具产生的合规责任", text)

    def test_userscript_requires_legal_confirmation_before_download(self):
        text = (ROOT / "video-download.user.js").read_text(encoding="utf-8")
        self.assertIn("confirm(", text)
        self.assertIn("仅下载自己拥有权利、获得授权或平台允许下载的内容", text)
        self.assertIn("if (!allowed) return;", text)

    def test_license_exists(self):
        text = (ROOT / "LICENSE").read_text(encoding="utf-8")
        self.assertIn("MIT License", text)
        self.assertIn("Copyright (c) 2026 JYLin111", text)


if __name__ == "__main__":
    unittest.main()
