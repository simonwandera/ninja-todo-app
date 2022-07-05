"""empty message

Revision ID: 017c243fe9dd
Revises: 33c81edb9fb9
Create Date: 2022-07-04 18:42:57.221010

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '017c243fe9dd'
down_revision = '33c81edb9fb9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('blogs')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('blogs',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('author', sa.VARCHAR(length=100), nullable=False),
    sa.Column('body', sa.VARCHAR(length=400), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###