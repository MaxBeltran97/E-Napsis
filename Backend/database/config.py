class Config(object):
    SECRET_KEY = 'f0faa2bed03b28e48544762d760aa169'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = False

class DevelopmentConfig(Config):
    """
    Development configurations
    """
    SQLALCHEMY_DATABASE_URI = "mysql://Diego:admin@localhost/napsis"
    SQLALCHEMY_POOL_RECYCLE = 300
    DEBUG = True
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    REDIS_URL = "redis://@redis:6379/0"

class TestingConfig(Config):
    """
    Testing configurations
    """
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:tec.wor_08@192.168.5.60:3306/Sineduc"
    SQLALCHEMY_POOL_RECYCLE = 300
    TESTING = True 
    DEBUG = True
    REDIS_URL = "redis://@redis:6379/0"

class ProductionConfig(Config):
    """
    Production configurations
    """
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:tec.wor_08@192.168.5.26:3306/Sineduc"
    SQLALCHEMY_POOL_RECYCLE = 300
    REDIS_URL = "redis://@redis:6379/0"

app_config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}
