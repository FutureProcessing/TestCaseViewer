namespace Web.DI
{
    using Autofac;
    using Tfs.DI;

    public class PerRequestModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterModule<TfsConnectionModule>();
        }
    }
}