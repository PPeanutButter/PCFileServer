import setuptools

# 读取项目的readme介绍
with open("readme.md", "r", encoding='utf-8') as fh:
    long_description = fh.read()

setuptools.setup(
    name="phttp.server",# 项目名称，保证它的唯一性，不要跟已存在的包名冲突即可
    version="0.0.1",
    author="ppeanutbutter", # 项目作者
    author_email="panrunqiu@outlook.com",
    description="PC端局域网流媒体服务器", # 项目的一句话描述
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/PPeanutButter/PCFileServer.git",# 项目地址
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License ::  MIT License",
        "Operating System :: OS Independent",
    ],
)