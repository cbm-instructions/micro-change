from setuptools import setup

setup(
    name='recorder',
    version='0.1.0',
    py_modules=['recorder'],
    install_requires=[
        'pyserial'
    ],
    entry_points={
        'console_scripts': [
            'recorder = recorder:cli',
        ]
    }
)
