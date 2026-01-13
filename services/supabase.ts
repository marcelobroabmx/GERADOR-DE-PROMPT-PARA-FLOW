
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const supabaseUrl = 'https://gvokxtfwyyhwmycasjnx.supabase.co';
const supabaseAnonKey = 'sb_publishable_POPzT8V7IZkjHyA3eawMnQ_bfMXxPg7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
