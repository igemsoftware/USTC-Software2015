from src.urls import addurl
from test_samples import test_reaction_system_sample, test_parts_system_sample

# This is the only section witch has connections with the platform
addurl(r'^biosys/test-reaction-system-sample/$', test_reaction_system_sample)
addurl(r'^biosys/test-parts-system-sample/$', test_parts_system_sample)